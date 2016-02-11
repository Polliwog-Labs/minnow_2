Expenses = React.createClass({
   getInitialState(){
    return {
      trip:this.props.trip || {}, 
      expenseView: null,
    };
   },

  //keeps track of child component view
  componentDidUpdate:function(){
    switch (this.state.expenseView){
      case 'newExpense':
        this.renderNew();
        break;
      default:
       this.renderDash();
     }
   },

  componentWillMount(){ //sets parent state to Expenses
    this.props.updateParent('Expenses');
  },
  setExpenseView(view){
    this.setState({expenseView:view})
  },

  componentDidMount: function () {
    this.renderDash();
  },

  renderDash: function () {
    $('#newExpense').removeClass('active');
    $('#dashboard').addClass('active');
    ReactDOM.render(<AllExpenses trip={this.state.trip} members={this.props.members} setExpenseView={this.setExpenseView}/>, document.getElementById('expense-module'))
  },

  renderNew: function () {
    $('#dashboard').removeClass('active');
    $('#newExpense').addClass('active');
    ReactDOM.render(<NewExpense updateParent={this.props.updateParent}  trip={this.props.trip} members={this.props.members} setExpenseView={this.setExpenseView}/>, document.getElementById('expense-module'))
  },

  componentWillReceiveProps(newProps){
    this.setState(newProps);
  },

  render: function () {
    return (
      <div>
        <div className="segmented-control expense-control row">
          <div className='col seg-item control-item modualactive' id="dashboard" onClick={this.renderDash}>
            All Expenses
          </div>
          <div className='col seg-item control-item modualactive' id="newExpense" onClick={this.renderNew}>
            New Expense
          </div>
        </div>
        <div id='expense-module'></div>
      </div>
    )
  }
});
