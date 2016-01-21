Expenses = React.createClass({


	submitExpense(event){
		event.preventDefault();
		var expense = ReactDOM.findDOMNode(this.refs.message_expense).value;
		console.log("Message: ", message);
		//Need to set a expenses schedma that can keep track of how much each person owes 
		Trips.update({"_id": this.props.trip._id}, {$push: {'expenses': {'text': expense, 'created_at': new Date(), 'sender': Meteor.user().username}}}, function(error){
			if(!error){
				console.log("inserted message into DB");
			}else if(error){
				console.log("error inserting message into DB: ", error);
			}
		});
	},

	render(){
		return(
		   <div className="message-wrapper">
			<footer className='list fixed-input'>
				<form className='item item-input-inset'>
					<label className='item-input-wrapper'>
						<input type='text' placeholder="Add a new expense" ref='message_expense'/>
					</label>
				   <button className='button button-positive' onClick={this.submitExpense}>Submit</button>
				</form>	
			</footer>
		   </div>
		)
	}
})