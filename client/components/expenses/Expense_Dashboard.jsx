ExpenseDashboard = React.createClass({
	render:function(){
		var member = this.props;
		var key = Object.keys(member);
		var setUp = this.props[key];
		var balance = Number((setUp).toFixed(2));
		return (
			<div className='item item-divider header-expenses'>
				<p className='balance'>Balance with {key} is ${balance}</p>
			</div>

		)
	}


})