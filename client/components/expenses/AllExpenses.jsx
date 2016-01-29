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

	showBalances:function(){
		var username = Meteor.user().username
		return this.props.trip.expense_dash.map(function (user) {
			if(user.user === username) {
				for(var key in user) {
					if(key !== "user") {
						console.log("key", key);
						console.log("user", user);
						console.log("user[key]", user[key]);
					return <ExpenseDashboard  user={key} balance={user[key]} />
				 }
			   }
			}
		})
	},


	render:function(){
		return(
			<div>
			<div>
				{this.showBalances()}
			</div>
			<div className="card">
			  {this.expense_list()}
			</div>
			</div>

	)
   }
})