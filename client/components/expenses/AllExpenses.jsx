AllExpenses = React.createClass({
	getInitialState(){
		var membersObj = {};
			this.props.members.forEach(function (member){
				membersObj[member.username] = false;
			});

		return {
			trip:{expenses:[]},
			checked: membersObj
		}
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
		var expenses = this.props.trip.expenses;
		var trip = this.props.trip;

		if(this.props.trip.expense_dash.length === 1){
			return (
				<div className="opaque-bg no-trips"><p className="no-invites">Invite others to see expenses!</p></div>
				);
		} else {

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
	}

	return userExpenseDash.map(function (member, index) {
		return <ExpenseDashboard key={index} trip={trip} members={showMembers} member={member} expenses={expenses} />
	});
		
	},


	render:function(){
		return(
			<div className="bg-ice dark-blue-text">
				{this.showBalances()}
			</div>
		)
   }
})