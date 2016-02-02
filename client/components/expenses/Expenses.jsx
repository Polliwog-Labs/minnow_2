Expenses = React.createClass({
   propTypes:{
     trip: React.PropTypes.object.isRequired
   },
   getInitialState(){
    return {
      trip:this.props.trip, 
      expenseView: null
    };
   },

   componentDidUpdate:function(){
    switch (this.state.expenseView){
      case 'newExpense':
        this.renderNew();
        break;
      default:
       this.renderDash();
   }
 },



  componentDidMount: function () {
    this.renderDash();
    this.props.updateParent('Expenses');
    // this.getExpenses();
  },
// getExpenses(){
//   Meteor.call('getTripById',this.props.trip._id,(err,data)=>{
//     !err && this.setState({trip:data});
//   });
// },
  renderDash: function () {
    $('#newExpense').removeClass('active');
    $('#dashboard').addClass('active');
    ReactDOM.render(<AllExpenses trip={this.state.trip} members={this.props.members} />, document.getElementById('expense-module'))
  },

  renderNew: function () {
    $('#dashboard').removeClass('active');
    $('#newExpense').addClass('active');
    ReactDOM.render(<NewExpense updateParent={this.props.updateParent}  trip={this.props.trip} members={this.props.members} toggled={this.state.toggled}/>, document.getElementById('expense-module'))
  },
// componentDidUpdate(){
//   this.renderDash();
// },
  componentWillReceiveProps(newProps){
    this.setState(newProps);
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
