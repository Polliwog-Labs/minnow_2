Expense = React.createClass({
	render(){
		var people = this.props.split_with.length + 1;
		var total = this.props.amount * people;
		return(
			<div className="item item-text-wrap">
				<p>{this.props.description}</p>
				<p>$ {total}</p>
				<p>Paid for by {this.props.created_by}</p>
			 </div>
		)
	}
});