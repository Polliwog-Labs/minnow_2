Expenses = React.createClass({
   propTypes:{
     trip: React.PropTypes.object.isRequired
   },
   getInitialState(){
    return {trip:{expenses:[]}};
   },
	// mixins: [ReactMeteorData], 

 //  getMeteorData:function(){
	// 	var trip = Trips.findOne({_id:this.props.trip._id});
	// 	return {trip:trip}
 //  },


componentDidMount: function () {
  this.renderDash();
  this.getExpenses();
},
getExpenses(){
  Meteor.call('getTripById',this.props.trip._id,(err,data)=>{
    this.setState({trip:data});
  });
},
renderDash: function () {
  $('#newExpense').removeClass('active');
  $('#dashboard').addClass('active');
  ReactDOM.render(<AllExpenses trip={this.state.trip}/>, document.getElementById('expense-module'))
},

renderNew: function () {
  $('#dashboard').removeClass('active');
  $('#newExpense').addClass('active');
  ReactDOM.render(<NewExpense update={this.getExpenses} trip={this.state.trip} />, document.getElementById('expense-module'))
},
componentDidUpdate(){
  this.renderDash();
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
