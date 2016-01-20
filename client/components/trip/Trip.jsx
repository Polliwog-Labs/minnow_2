Trip = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function(){
    var trip = Trips.findOne(document.location.pathname.substring(6));
    console.log('trip: ', trip)
    return {trip:trip};
  },

  getInitialState: function () {
    return {}
  },

  componentDidMount: function () {
    this.renderHome()
  },

  renderHome: function () {
    $('.active').removeClass('active');
    $('#home').addClass('active');
    ReactDOM.render(<TripHome trip={this.data.trip}/>, document.getElementById('trip-module'))
  },

  renderItinerary: function () {
    $('.active').removeClass('active');
    $('#itinerary').addClass('active');
    ReactDOM.render(<Itinerary trip={this.data.trip}/>, document.getElementById('trip-module'))
  },

  renderChat: function () {
    $('.active').removeClass('active');
    $('#chat').addClass('active');
    ReactDOM.render(<Messages trip={this.data.trip}/>, document.getElementById('trip-module'))
  },

  renderSettings: function () {
    $('.active').removeClass('active');
    $('#settings').addClass('active');
  },

  renderExpenses: function () {
    $('.active').removeClass('active');
    $('#cash').addClass('active');
  },


  render: function(){

    return (
      <div>
        <div className="tabs tabs-icon-top">
          <a className="tab-item active" id='home'onClick={this.renderHome}>
            <i className="icon ion-home"></i>
            Home
          </a>
          <a className="tab-item" id='itinerary' onClick={this.renderItinerary}>
            <i className="icon ion-ios-list-outline"></i>
            Itinerary
          </a>
          <a className="tab-item" id="chat" onClick={this.renderChat}>
            <i className="icon ion-chatboxes"></i>
            Chat
          </a>
          <a className="tab-item" id='cash' onClick={this.renderExpenses}>
            <i className="icon ion-cash expenses"></i>
            Expenses
          </a>
          <a className="tab-item" id='settings' onClick={this.renderSettings}>
            <i className="icon ion-gear-a settings"></i>
            Settings
          </a>
        </div> 
        <div id='trip-module'></div>
      </div>  
    )
  }
})
