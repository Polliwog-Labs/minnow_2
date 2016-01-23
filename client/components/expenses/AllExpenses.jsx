AllExpenses = React.createClass({
	getInitialState(){
		return {trip:{expenses:[]}}
	},
	componentWillReceieveProps(newProps){
		this.setState({trip:newProps});
	},
	expense_list(){
		return this.props.trip.expenses.map(function(expense,index){
			return <Expense key={index} {...expense} />
		});
	},
	render:function(){
		return(
			<div className="card">
			  {this.expense_list()}
			</div>

	)
   }
})