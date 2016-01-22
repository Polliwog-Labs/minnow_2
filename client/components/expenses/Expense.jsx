Expense = React.createClass({
	render(){
		return(
			<div className="item item-text-wrap">
				<p>{this.props.description}</p>
				<p>{this.props.amount}</p>
			 </div>
		)
	}
});