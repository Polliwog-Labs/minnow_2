Trip = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var user = Meteor.user();
    var data = {view:'Home',
                members:[]};
    var tripId = document.location.pathname.substring(6);
    var handle = Meteor.subscribe('singleTrip',tripId,user);
    if (handle.ready()){
      data.trip = Trips.findOne({_id: tripId});
      var handle0 = Meteor.subscribe('tripUsers',data.trip);
      if (handle0.ready()){
        data.members = Users.find({_id:{$in:data.trip.members}}).fetch();
      }
    }
    return data;
  },

  getInitialState: function () {
    return {trip:{members:[]},
            view:null,
            members:[]}
  },

  componentDidMount(){
    !this.state.view && this.renderHome();
  },

  componentDidUpdate(){
    switch (this.state.view){
      case 'Messages':
        this.renderChat();
        break;
      case 'Expenses':
        this.renderExpenses();
        break;
      case 'Itinerary':
        this.renderItinerary();
        break;
      case 'Photos':
        this.renderPhotos();
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
    ReactDOM.render(<TripHome members={this.data.members || []} trip={this.data.trip} history={this.props.history}/>, document.getElementById('trip-module'));
  },

  renderItinerary: function () {
    // this.setState({view: 'Itinerary'});
    $('.active').removeClass('active');
    $('#itinerary').addClass('active');
    ReactDOM.render(<Itinerary updateParent={this.setParentState} trip={this.data.trip} />, document.getElementById('trip-module'));
   // ReactDOM.render(<Itinerary trip={this.data.trip} />, document.getElementById('trip-module'));

  },

  renderChat: function () {
    $('.active').removeClass('active');
    $('#chat').addClass('active');
    ReactDOM.render(<Messages updateParent={this.setParentState} memberProfiles={this.data.members} trip={this.data.trip}/>, document.getElementById('trip-module'));
  },

  renderPhotos: function () {
    $('.active').removeClass('active');
    $('#photos').addClass('active');
    ReactDOM.render(<Photos updateParent={this.setParentState} trip={this.data.trip}/>, document.getElementById('trip-module'));

  },

  renderExpenses: function () {
    $('.active').removeClass('active');
    $('#cash').addClass('active');
    ReactDOM.render(<Expenses updateParent={this.setParentState} trip={this.data.trip} members={this.data.members}/>, document.getElementById('trip-module'));
  },

  render: function(){
    return (
      <div>
        <div className="footer-fixed tabs tabs-icon-top">
          <a className="tab-item active" id='home'onClick={this.renderHome}>
            <i className="icon ion-ios-home"></i>
            Home
          </a>
          <a className="tab-item" id='itinerary' onClick={this.renderItinerary}>
            <i className="icon ion-ios-list"></i>
            Itinerary
          </a>
          <a className="tab-item" id="chat" onClick={this.renderChat}>
            <i className="icon ion-ios-chatboxes"></i>
            Chat
          </a>
          <a className="tab-item" id='photos' onClick={this.renderPhotos}>
            <i className="icon ion-ios-camera"></i>
            Photos
          </a>
          <a className="tab-item" id='cash' onClick={this.renderExpenses}>
            <i className="icon ion-cash expenses"></i>
            Expenses
          </a>
        </div>
        <div className='has-footer' id='trip-module'></div>
      </div>
    )
  }
});
