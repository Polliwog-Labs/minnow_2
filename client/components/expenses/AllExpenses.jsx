AllExpenses = React.createClass({
	getInitialState(){
		return {
			trip:{expenses:[]
			},
			show:false
		}
	},


	componentWillReceieveProps(newProps){
		this.setState({trip:newProps});
	},
	expense_list(){
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
		var showMembers = this.props.members;
		var username = Meteor.user().username
		var userExpenseDash = [];
		var expenses = this.props.trip.expenses

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
			return <ExpenseDashboard  key={index} member={member} expenses={expenses} />
		});

	},


	render:function(){
		return(
			<div className='list'>
				{this.showBalances()}
			</div>
	)
   }
})