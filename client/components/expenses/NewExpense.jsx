NewExpense = React.createClass({
	submitExpense(event){
		event.preventDefault();
		var expense_details = ReactDOM.findDOMNode(this.refs.expense_details).value;
		var expense_amount = ReactDOM.findDOMNode(this.refs.expense_amount).value;
		var user = Meteor.user();
		var username = user.username
		
		// var expense_split = ReactDOM.findDOMNode(this.refs.expense_split).value;
		//Need to set a expenses schedma that can keep track of how much each person owes

		Meteor.call('pushExpense',{
			trip_id: this.props.trip._id,
			description: expense_details,
			amount: expense_amount,
			split_with: this.state.split_with
		}, Meteor.user(), this.props.trip.expense_dash,(err)=>{
      !err && this.props.updateParent('Expenses');
		});
	},


	getInitialState() {

	var membersObj = {};
	this.props.members.forEach(function (member){
		membersObj[member.username] = false;
	});
    return {show: false,
    	   split: membersObj,
    	   split_with: []
      };
    },

	showModal() {
	    this.setState({show: true});
	  },

	  hideModal() {
	    this.setState({show: false});
	  },
	updateSplitWith(users){
		this.setState({split_with:users})
	},

  onToggle:function(value){
  	var username = value.target.value;
  	var newSplit = this.state.split;
  	console.log("state",newSplit);
  	newSplit[username] = !newSplit[username];
  	this.setState({split: newSplit});
  	console.log(this.state);
  },

  createSplit:function(){
  	var state = this.state.split;
  	console.log("state before", this.state);
  	for(var key in state) {
  		console.log("key",key);
  		if(state[key] === true) {
  			this.state.split_with.push(key);
  		}
  	}
  	this.hideModal();
  },

  showSplitWith:function(){
  	console.log("hit funciton");
  	console.log("this.state.split_with", this.state.split_with);
  	return this.state.split_with.map(function (member, index){
  		console.log("member", member);
  		return (
  			<ul>
  				<li ref={index} >{member}</li>
  			</ul>
  		)
  	})
  },


	populateMembers:function() {
		
		var that = this

	     return this.props.members.map(function (user, index) {
	     	var id = Meteor.userId();
	     	// that.setState({ [index]: false});
	     	user.toggled = false;
	     	if(user._id !== id) {
	     		console.log("index", index)
			return (
    	  <div key={index}>
			  <li ref="split_with" className="item item-toggle">
			        {user.username}
				     <label className="toggle toggle-balanced">
				       <input id={index} type="checkbox" value={user.username} onChange={this.change} onClick={that.onToggle}/>
			     	       <div className="track">
					         <div className="handle" />
						       </div>
					    </label>
				    </li>
		   </div>
		   )
	}
  })		
},

	render(){
		return(
		  <div className="list">
			  <label className="item item-input item-stacked-label">
			    <span className="input-label">Add a new expense</span>
			    <input type="text" placeholder="Description" ref='expense_details'/>
			  </label>
			  <label className="item item-input item-stacked-label">
			    <span className="input-label">Amount</span>
			    <input type="number" placeholder="$" ref='expense_amount'/>
			  </label>
			  <label className="item item-input item-stacked-label">
				  <div className="input-label">Split With:</div>
				    <ReactBootstrap.Modal
			          {...this.props}
			          show={this.state.show}
			          onHide={this.hideModal}
			          dialogClassName="custom-modal">

			          <ReactBootstrap.Modal.Header closeButton>
			            <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Toggle to split</ReactBootstrap.Modal.Title>
			          </ReactBootstrap.Modal.Header>
			          <ReactBootstrap.Modal.Body>
			          <ul className="list">
			          	{this.state.show && this.populateMembers()}
			          </ul>
			          </ReactBootstrap.Modal.Body>
			          <ReactBootstrap.Modal.Footer>
			            <ReactBootstrap.Button onClick={this.createSplit} >Split With Selected</ReactBootstrap.Button>
			          </ReactBootstrap.Modal.Footer>
			        </ReactBootstrap.Modal>
			        <div className="row add-idea">
			          <div className='col'>
			            <a onClick={ this.showModal }>
			              <i className="icon ion-plus-circled"></i>
			              <span className='icon-label'>Click to split</span>
			            </a>
			            	{
			          		this.state.split_with ? 
			          		<div>
			          			{this.showSplitWith()}
			          		</div> : ''
			          	}
			          </div>
			          <div className='col'></div>
			        </div>
			  </label>
			  <button className="button button-block button-positive" onClick={this.submitExpense}>Submit</button>
		</div>
		)
	}
});

