Trip = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var user = Meteor.user();
    var data = {view:'Home'};
    var tripId = document.location.pathname.substring(6);
    var handle = Meteor.subscribe('singleTrip',tripId,user);
    if (handle.ready()){
      data.trip = Trips.findOne({_id: tripId});
    }
    return data;
  },

  getInitialState: function () {
    return {trip:{members:[]},
            view:null,
            members:[]}
  },
  getTripData: function (view) {
    Meteor.call('getTripById',document.location.pathname.substring(6),(err,data)=>{
      if (err) console.log(err)
      else {
        var members = [];
        if (data.members) {
          data.members.forEach(member=>{
            Meteor.call('getUserById',member,(err,memberData)=>{
              !err && members.push(memberData);
              this.setState({trip:data,
                             view:view,
                             members:members});
            });
          });
        } else {
          this.setState({trip:data,
                         view:view,
                         members:members});
        }
      }
    });
  },
  componentDidUpdate(){
    switch (this.state.view){
      case 'Messages':
        this.renderChat();
        break;
      case 'Settings':
        this.renderSettings();
        break;
      case 'Expenses':
        this.renderExpenses();
        break;
      case 'Itinerary':
        this.renderItinerary();
        break;
      default:
        this.renderHome();
    }
  },
  setParentState(view){
    this.setState({view:view})
  },
  renderHome: function () {
    $('.active').removeClass('active');
    $('#home').addClass('active');
    ReactDOM.render(<TripHome updateParent={this.setParentState} members={this.state.members} trip={this.data.trip}/>, document.getElementById('trip-module'));
  },

  renderItinerary: function () {
    // this.setState({view: 'Itinerary'});
    $('.active').removeClass('active');
    $('#itinerary').addClass('active');
    ReactDOM.render(<Itinerary trip={this.data.trip}/>, document.getElementById('trip-module'));
   // ReactDOM.render(<Itinerary trip={this.data.trip} />, document.getElementById('trip-module'));

  },

  renderChat: function () {
    $('.active').removeClass('active');
    $('#chat').addClass('active');
    ReactDOM.render(<Messages updateParent={this.setParentState} trip={this.data.trip}/>, document.getElementById('trip-module'));
  },

  // renderSettings: function () {
  //   $('.active').removeClass('active');
  //   $('#pencil').addClass('active');
  //   ReactDOM.render(<EditTrip updateParent={this.getTripData} trip={this.state.trip}/>, document.getElementById('trip-module'));
  // },

  renderExpenses: function () {
    $('.active').removeClass('active');
    $('#cash').addClass('active');
    ReactDOM.render(<Expenses updateParent={this.setParentState} trip={this.data.trip}/>, document.getElementById('trip-module'));
  },
  render: function(){
    return (
      <div>
        <div className="footer-fixed tabs tabs-icon-top">
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
        <div className='has-footer' id='trip-module'></div>
      </div>
    )
  }
});
