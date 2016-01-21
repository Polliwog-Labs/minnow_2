Expenses = React.createClass({


	submitExpense(event){
		event.preventDefault();
		var expense_details = ReactDOM.findDOMNode(this.refs.expense_details).value;
		var expense_amount = ReactDOM.findDOMNode(this.refs.expense_amount).value;
		var expense_split = ReactDOM.findDOMNode(this.refs.expense_split).value;
		console.log("Expense ", expense);
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

<div className="list">
  <label className="item item-input item-stacked-label">
    <span className="input-label">Add a new expense</span>
    <input type="text" placeholder="Description" ref='expense_details'>
  </label>
  <label className="item item-input item-stacked-label">
    <span className="input-label">Amount</span>
    <input type="number" placeholder="$" ref='expense_amount'>
  </label>
  <label className="item item-input item-stacked-label">
    <span classNae="input-label">Split with:</span>
    <input type="text" placeholder="Name" ref='expense_split'>
  </label>
  <button class="button button-block button-positive">Submit</button>
</div>