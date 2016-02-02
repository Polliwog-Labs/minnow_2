ExpenseDashboard = React.createClass({
	render:function(){
		var member = this.props;
		var key = Object.keys(member);
		var setUp = this.props[key];
		var balance = Number((setUp).toFixed(2));



		return (
			<div className='item item-divider header-expenses'>
				{ balance === 0 ? <p className='balance'>You are even with {key}</p>:
				    balance > 0 ? 
					<p className='dark-blue-text balance'>{key} owes you ${balance}</p> : 
					<p className='dark-blue-text balance'>You owe {key} ${(balance) * -1}</p>
				}
			</div>

		)
	}


})