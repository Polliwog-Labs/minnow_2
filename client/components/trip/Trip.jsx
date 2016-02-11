Trip = React.createClass({

  mixins: [ReactMeteorData],

  //defines subscriptions to Trip data so any changes are pushed up to client
  //and distributed to child components
  getMeteorData() {
    var user = Meteor.user();
    var data = {view:'Home',
                members:null,
                declined:null,
                trip:null};
    var tripId = document.location.pathname.substring(6);
    var singleTrip = Meteor.subscribe('singleTrip',tripId,user);
    data.trip = Trips.findOne({_id: tripId});
    var tripUsers = Meteor.subscribe('tripUsers',data.trip);
    if (tripUsers.ready()){
      data.members = Users.find({_id:{$in:data.trip.members}}).fetch();
      var tripDeclined = Meteor.subscribe('tripDeclined', data.trip);
      if (tripDeclined.ready()){
        data.declined = Users.find({_id: {$in: data.trip.declined}}).fetch();
      }
    }
    return data;
  },

  getInitialState: function () {
    return {trip:{members:[]},
            view:null,
            members:[]}
  },

  //keeps track of what component to render after the data has been updated
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

  //called from child components after render to set the view state of trip to allow the 
  //componentDidUpdate to work
  setParentState(view){
    this.setState({view:view || null})
  },

  shouldComponentUpdate(newProps,newState){
    if (newState && newState.view) return newState.view !== this.state.view;
    return true;
  },

  renderHome: function () {
    $('.active').removeClass('active');
    $('#home').addClass('active');
    ReactDOM.render(<TripHome updateParent={this.setParentState} members={this.data.members} declined={this.data.declined} trip={this.data.trip} history={this.props.history}/>, document.getElementById('trip-module'));
  },

  renderItinerary: function () {
    $('.active').removeClass('active');
    $('#itinerary').addClass('active');
    ReactDOM.render(<Itinerary updateParent={this.setParentState} trip={this.data.trip} />, document.getElementById('trip-module'));

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
