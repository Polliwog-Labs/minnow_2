NewExpense = React.createClass({
	submitExpense(event){
		event.preventDefault();
		var expense_details = ReactDOM.findDOMNode(this.refs.expense_details).value;
		var expense_amount = ReactDOM.findDOMNode(this.refs.expense_amount).value;
		console.log("expense details", expense_details)
		// var expense_split = ReactDOM.findDOMNode(this.refs.expense_split).value;
		//Need to set a expenses schedma that can keep track of how much each person owes
		Meteor.call('pushExpense'{
			trip_id: this.props.trip._id,
			description: expense_details,
			amount: expense_amount,
			uername: Meteor.user().username
		},(err)={
      !err && this.props.update();
		});
  //   return Trips.update({"_id": expense.trip._id}, {$push: {'expenses': {'description': expense.description, 'amount': Number(expense.amount),  'created_at': new Date(), 'sender': expense.username}}},(error)=>{
  //     return !err;
  //   });
		
		// Trips.update({"_id": this.props.trip._id}, {$push: {'expenses': {'description': expense_details, 'amount': Number(expense_amount),  'created_at': new Date(), 'sender': Meteor.user().username}}},(error)=>{
		// 	if(!error){
		// 		console.log("inserted expense into DB");
		// 		this.props.callback();
		// 	}else if(error){
		// 		console.log("error inserting message into DB: ", error);
		// 	}
		// });
	},

	findUsers:function(){
		console.log("this.props",this.props)
	},

	getInitialState() {
    return {show: false};
    },

	showModal() {
	    this.setState({show: true});
	  },

	  hideModal() {
	    this.setState({show: false});
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
			          dialogClassName="custom-modal"
			        >
			          <ReactBootstrap.Modal.Header closeButton>
			            <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Toggle to split</ReactBootstrap.Modal.Title>
			          </ReactBootstrap.Modal.Header>
			          <ReactBootstrap.Modal.Body>
			            <SplitModal />
			          </ReactBootstrap.Modal.Body>
			          <ReactBootstrap.Modal.Footer>
			            <ReactBootstrap.Button onClick={this.hideModal}>Return</ReactBootstrap.Button>
			          </ReactBootstrap.Modal.Footer>
			        </ReactBootstrap.Modal>
			        <div className="row add-idea">
			          <div className='col'>
			            <a onClick={ this.showModal }>
			              <i className="icon ion-plus-circled"></i>
			              <span className='icon-label'>Click to split</span>
			            </a>
			          </div>
			          <div className='col'></div>
			        </div>
			  </label>
			  <button className="button button-block button-positive" onClick={this.submitExpense}>Submit</button>
		</div>
		)
	}
});

