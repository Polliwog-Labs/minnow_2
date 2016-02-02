ExpenseDashboard = React.createClass({

getInitialState(){
	return {
		show:false
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
	var image = undefined;
	console.log("key",key[0]);
	Meteor.call('findUserByName', key[0], function (err, data){
		if(err) {
			console.log("error",err);
		} else {
			Meteor.call('retrieveProfilePic', data._id, function (err, imageId) {
				if(err) {
					console.log(err);
				}else {
					console.log("imageId", imageId);
					image=imageId;
				}
			});
		}
	});

  	if(this.props && image){
  		return <Image ionicClass='avatar-image' image_id={image} height="80px" profile={true}/>
  	}else{
  		return <img className="avatar-image" src='https://facebook.github.io/react/img/logo.svg' />
  	}
  },


  showTransactions:function(){
  	var user = Meteor.user().username;
  	var member = this.props.member;
	var key = Object.keys(member);
	this.showModal()


	function expenseFilter(expense){
		var splitArray = expense.split_with;
		var created_by = expense.created_by;
		console.log(created_by);
		console.log(splitArray)

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
   console.log("filtered",filtered)


   return filtered.forEach(function (expense, index){
   	console.log("expense", expense)
   	var people = expense.split_with.length + 1;
	var total = (expense.amount * people).toFixed(2);
   	  return (
   		<div className="item item-text-wrap">
			<p>{expense.description}</p>
			<p>$ {total}</p>
			<p>Paid for by {expense.created_by}</p>
		</div>
   		)
   })

  },

	render:function(){
		var member = this.props.member;
		var key = Object.keys(member);
		var setUp = member[key];
		var balance = Number((setUp).toFixed(2));

		return (
			<a className="item item-thumbnail-left">
		      {this.renderImage()}
		      { balance === 0 ? <h3>You are even with {key}</h3>:
				    balance > 0 ? 
					<h3>{key} owes you ${balance}</h3> : 
					<h3>You owe {key} ${(balance) * -1}</h3>
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
			      	{this.showTransactions}
			      </ul>
			      </ReactBootstrap.Modal.Body>
			    </ReactBootstrap.Modal>
			  <p onClick={this.showTransactions}>
			   <i className="icon ion-plus-circled"></i>
			   	<span className='icon-label'>View charges with {key}</span>     
			  </p> 
		    </a>

		)
	}

})