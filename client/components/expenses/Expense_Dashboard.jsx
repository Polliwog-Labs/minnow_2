ExpenseDashboard = React.createClass({
	render:function(){
		return (
			<div className='item item-divider header-expenses'>
				<p className='balance'>Balance with {this.props.user}: {this.props.balance}</p>
			</div>

		)
	}


})