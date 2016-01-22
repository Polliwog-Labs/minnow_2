NewExpense = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function(){
		
		return{};
	},

	submitExpense(event){
		event.preventDefault();
		var expense_details = ReactDOM.findDOMNode(this.refs.expense_details).value;
		var expense_amount = ReactDOM.findDOMNode(this.refs.expense_amount).value;
		// var expense_split = ReactDOM.findDOMNode(this.refs.expense_split).value;
		//Need to set a expenses schedma that can keep track of how much each person owes 
		Trips.update({"_id": this.props.trip._id}, {$push: {'expenses': {'description': expense_details, 'amount': Number(expense_amount),  'created_at': new Date(), 'sender': Meteor.user().username}}}, function(error){
			if(!error){
				console.log("inserted expense into DB");
			}else if(error){
				console.log("error inserting message into DB: ", error);
			}
		});
	},

	findUsers:function(){
		console.log("this.props",this.props)

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
			  <label className="item item-input item-select">
				  <div className="input-label">Split With:</div>
				    <select>
				    <option>All</option>
				      <option>Ryan</option>
				      <option>Joey</option>
				      <option>Daniel</option>
				      <option>Ashley</option>
				    </select>
			  </label>
			  <button className="button button-block button-positive" onClick={this.submitExpense}>Submit</button>
		</div>
		)
	}
});

