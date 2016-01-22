AllExpenses = React.createClass({
	render:function(){
		var expense_list = this.props.trip.expenses.map(function(expense){
			return <Expense {...expense} />
		});
		return(
			<div className="card">
			  {expense_list}
			</div>

	)
   }
})