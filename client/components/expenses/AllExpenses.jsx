AllExpenses = React.createClass({
	getInitialState(){
		return {trip:{expenses:[]}}
	},
	render:function(){
		var expense_list = this.props.trip.expenses.map(function(expense,index){
			return <Expense key={index} {...expense} />
		});
		return(
			<div className="card">
			  {expense_list}
			</div>

	)
   }
})