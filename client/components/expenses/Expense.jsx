Expense = React.createClass({
	render(){
		return(
			<div className="item item-text-wrap">
				<p>{this.props.description}</p>
				<p>$ {this.props.amount}</p>
				<p>{this.props.created_by} split this with {this.props.split_with}</p>
			 </div>
		)
	}
});