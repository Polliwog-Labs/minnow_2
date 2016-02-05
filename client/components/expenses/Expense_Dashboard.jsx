ExpenseDashboard = React.createClass({

getInitialState(){

	var membersObj = {};
	this.props.members.forEach(function (member){
		membersObj[member.username] = false;
	});

	return {
		show:false,
		checked: membersObj,
	}
},

showModal:function(){
	    this.setState({show: true});
	  },

hideModal:function(){
 	    this.setState({show: false});
	  },

renderImage:function(){
  if (this.props.member){
   	var thisMember = this.props.member;
  	var key = Object.keys(thisMember);

  	var member = this.props.members.filter(function (member, index){
  		return member.username === key[0];
  	 })[0];

  	if(member.profile.imageId !== undefined) {
  		return (<Image image_id={member.profile.imageId} height="80px" profile={true}/>)
  	} else {
  		return (<img src='https://facebook.github.io/react/img/logo.svg'/>)
  	}
  } else return <div/>;
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
		var setUp = member[key].toString();
		var checkedState = this.state.checked;

		function addZeroes( num ) {
		    var value = Number(num);
		    var res = num.split(".");
		    if(num.indexOf('.') === -1) {
		        value = value.toFixed(2);
		        num = value.toString();
		    } else if (res[1].length < 3) {
		        value = value.toFixed(2);
		        num = value.toString();
		    }
		return num
		}

		var balance = addZeroes(setUp);



		return (
			<a className="item item-thumbnail-left">
			  {this.renderImage()}
		      {checkedState[key] ? "" :
		      	 balance === 0 ? <p className='dark-blue-text balance'>You are even with {key}</p>:
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
			        <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Transactions with {key}</ReactBootstrap.Modal.Title>
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

