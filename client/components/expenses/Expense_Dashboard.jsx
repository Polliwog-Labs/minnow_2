ExpenseDashboard = React.createClass({

getInitialState(){

	var membersObj = {};
	this.props.members.forEach(function (member){
		membersObj[member.username] = false;
	});
	return {
		show:false,
		checked: membersObj
	}
},

showModal:function(){
	    this.setState({show: true});
	  },

hideModal:function(){
 	    this.setState({show: false});
	  },

renderImage:function(){
 	var member = this.props.member;
	var key = Object.keys(member);
	
	// console.log("key",key[0]);
	var userImage = Meteor.call('findUserByName', key[0], function (err, data){
		if(err) {
			console.log("error",err);
		} else {
			return data.profile.imageId;
		}
	});

	setTimeout(function(){
		console.log("userImage", userImage)
	  },3000);

	if(userImage === undefined) {
		return (
			 <img src='https://facebook.github.io/react/img/logo.svg'/>
			)
		} else {
			return (
				 <Image image_id={image} height="80px" profile={true}/>
					)
			}

  },


  showTransactions:function(){
  	var user = Meteor.user().username;
  	var member = this.props.member;
	var key = Object.keys(member);



	function expenseFilter(expense){
		var splitArray = expense.split_with;
		var created_by = expense.created_by;

		if(created_by === user){
			if(splitArray.indexOf(key[0]) !== -1) {
				return true;
			}
		} else if(created_by === key[0]){
			if(splitArray.indexOf(user) !== -1){
				return true 
			}
		} else {
			return false
		}
	}

   var filtered = this.props.expenses.filter(expenseFilter);

   if(filtered.length === 0){
   	return (
   		<div className="opaque-bg no-trips"><p className="no-invites">No charges between you and {key} yet!</p></div>
   		)
   }

   return filtered.map(function (expense, index){
	   	var people = expense.split_with.length + 1;
		var total = (expense.amount * people).toFixed(2);
		if(expense.amount !== undefined){
	   	  return (
	   		<div key={index} className="item item-text-wrap">
	   		  <li className ="item" >
				<p>{expense.description}</p>
				<p>$ {expense.amount} per person</p>
				<p>Paid for by {expense.created_by}</p>
			  </li>
			</div>

	   		)
	   	} else {
	   		return (
	   			<div key={index} className="item item-text-wrap">
	   				<li className="item">
	   					<p>{expense.description}</p>
	   				</li>
	   			</div>
	   			)
	   	}
   })

  },

  payedBalance:function(value){
  	//Get rid of button and replace with "You just paid user this balance"
  	//Update the balances 
  	var name = this.props.member
  	var user = Object.keys(name);
  	var member = user[0];
  	var user = Meteor.user().username;
  	var dash = this.props.trip.expense_dash
  	var trip = this.props.trip
  	
  	var changeChecked = this.state.checked;
  	changeChecked[member] = !changeChecked[member];
  	this.setState({checked: changeChecked});

  	setTimeout(()=>{
  		changeChecked[member] = !changeChecked[member];
  		this.setState({checked: changeChecked});
  		Meteor.call("payExpense", user, member, dash, trip)
  	},5000)


  },

	render:function(){

		var member = this.props.member;
		var key = Object.keys(member);
		var setUp = member[key];
		var balance = Number((setUp).toFixed(2));
		var checkedState = this.state.checked;
		var user = Meteor.user().username

		return (
			<a className="item item-thumbnail-left">
		      {this.renderImage()}
		      {checkedState[key] ? "" :
		      	 balance === 0 ? <p className= 'dark-blue-text'>You are even with {key}</p>:
				    balance > 0 ? 
					<p className='dark-blue-text balance'>{key} owes you ${balance}</p> : 
					<p className='dark-blue-text balance'>You owe {key} ${(balance) * -1}</p>
				}
			  <ReactBootstrap.Modal
			      {...this.props}
			      show={this.state.show}
			      onHide={this.hideModal}
			      dialogClassName="custom-modal">
			      <ReactBootstrap.Modal.Header closeButton>
			        <ReactBootstrap.Modal.Title id="contained-modal-title-lg">All transactions between you and {key}</ReactBootstrap.Modal.Title>
			      </ReactBootstrap.Modal.Header>
			      <ReactBootstrap.Modal.Body>
			      <ul className="list">
			      	{this.state.show && this.showTransactions()}
			      </ul>
			      </ReactBootstrap.Modal.Body>
			    </ReactBootstrap.Modal>
			  { checkedState[key] ? "":
			  <p onClick={this.showModal}>
			   <i className="icon ion-plus-circled"></i>
			   	<span className='showTransactions'className='icon-label'>View charges with {key}</span>     
			  </p>
			   }
			<div>
			 
			
			  { balance < 0 && !checkedState[key] ? 
			  		<div id={key}><VenmoButton /><ReactBootstrap.Button value={key} className='expenseDashButtons' onClick={this.payedBalance}  bsStyle="primary" bsSize="small" active>Pay {key} ${balance * -1}</ReactBootstrap.Button></div>: 
			  			balance < 0 && checkedState[key] ? 
			  				<p> Thank you for paying {key} your balance of ${balance * -1} </p> : ""}
			 </div>
		    </a>
		)
	}
});

