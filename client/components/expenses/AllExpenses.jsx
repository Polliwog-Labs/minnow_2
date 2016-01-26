AllExpenses = React.createClass({
	getInitialState(){
		return {trip:{expenses:[]}}
	},
	componentWillReceieveProps(newProps){
		this.setState({trip:newProps});
	},
	expense_list(){
		console.log(this.props.trip.expenses.length)
		if(this.props.trip.expenses.length === 0) {
			console.log("hit if statment")
			return (
				<h3>No charges yet</h3>
			)
		}
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