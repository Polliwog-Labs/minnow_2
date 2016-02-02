Expense = React.createClass({

	render:function(){
		var people = this.props.expense.split_with.length + 1;
		var total = (this.props.expense.amount * people).toFixed(2);
		return(
			<div className="item item-text-wrap">
				<p>{this.props.expense.description}</p>
				<p>$ {total}</p>
				<p>Paid for by {this.props.expense.created_by}</p>
			 </div>
		)
	}
});