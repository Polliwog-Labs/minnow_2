AllExpenses = React.createClass({
	getInitialState(){
		return {trip:{expenses:[]}}
	},
	componentWillReceieveProps(newProps){
		this.setState({trip:newProps});
	},
	expense_list(){
		if(this.props.trip.expenses.length === 0) {
			console.log("hit if statment")
			return (
				<h3 className="dark-blue-text h-three-override">No charges yet</h3>
			)
		}
		return this.props.trip.expenses.map(function(expense,index){
			return <Expense key={index} {...expense} />
		});
	},

	showBalances:function(){
		var showMembers = this.props.members;
		var username = Meteor.user().username
		var userExpenseDash = [];

		this.props.trip.expense_dash.map(function (user){
			if(user.user === username) {
				for(var key in user) {
					if(key !== "user") {
						var memberObject = {};
						var balance = user[key]
						memberObject[key] = balance;
						userExpenseDash.push(memberObject);
					}
				}
			}
		});

		return userExpenseDash.map(function (member, index) {
			return <ExpenseDashboard key={index} {...member} />
		});

	},


	render:function(){
		return(
			<div className="bg-ice dark-blue-text">
				<div className="bg-ice dark-blue-text" >
					{this.showBalances()}
				</div>
				<div className="dark-blue-text bg-ice card">
				  {this.expense_list()}
				</div>
			</div>

	)
   }
})