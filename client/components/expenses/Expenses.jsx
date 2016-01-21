Expenses = React.createClass({

  componentDidMount: function () {
    this.renderDash();
  },

  renderDash: function () {
  	console.log("this.props", this.props);
    $('#newExpense').removeClass('active');
    $('#dashboard').addClass('active');
    ReactDOM.render(<AllExpenses trip={this.props.trip}/>, document.getElementById('expense-module'))
  },

  renderNew: function () {
    $('#dashboard').removeClass('active');
    $('#newExpense').addClass('active');
    ReactDOM.render(<NewExpense trip={this.props.trip} />, document.getElementById('expense-module'))
  },

render: function () {
    return (
      <div>
        <div className="segmented-control col">
          <a className="control-item modualactive" id="dashboard" onClick={this.renderDash}>
            All Expenses
          </a>
          <a className="control-item" id="newExpense" onClick={this.renderNew}>
            New Expense
          </a>
        </div>
        <div id='expense-module'></div>
      </div>
    )
  }
});
