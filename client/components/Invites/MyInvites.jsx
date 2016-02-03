MyInvites = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var data = {};
    var user = Meteor.user() || window.location.pathname.substring(9).toLowerCase();
    var invites = Meteor.subscribe('Invites',user);
    if (Meteor.user()){
        var users = Meteor.subscribe('UserData',Meteor.user());
        var trips = Meteor.subscribe('userTrips',Meteor.user());
        if (users.ready() && trips.ready()){
          data.user = Users.findOne();
          data.trips = Trips.find().fetch();
        }
      }
    if (invites.ready()){
      data.invites = Invites.find().fetch();
    }
    return data;
  },
	getInitialState(){
	  return {trips:[]};
  },

  componentDidMount(){
    setTimeout(()=>{
      Meteor.call('notify',Meteor.userId(),'clear');
      if (!Meteor.user()){
        Meteor.call('getTripsFromInvites',this.data.invites,(err,data)=>{
          !err && this.setState({trips:data});
        })
      }
    },500);
	},

  renderTrips: function(){
    if (Trips.find().fetch().length) {
      return Trips.find().fetch().map(trip=>{
        return (
          <InviteList key={trip._id} trip={trip} history={this.props.history}/>
        );
      });
    } else if (this.state.trips.length) {
      return this.state.trips.map(trip=>{
        return (
          <InviteList key={trip._id} trip={trip} history={this.props.history}/>
        );
      })
    } else return (<p className='card card-fix'>You currently have no trips! Create a trip and invite friends</p>);
  },

  renderSignupLink(){
    if (!Meteor.user()){
      return (
        <div className='card card-fix'>
          <a href="/signup">Sign up for Minnow to join these trips!</a>
        </div>
      );
    }
  },

  render: function(){
    return (
      <div className='list bg-ice'>
        <div className='item bg-ice'>
          <div className="h-override">
            <h2 className='dark-blue-text header-override'>My Invites</h2>
          </div>
          {this.renderTrips()}
          {this.renderSignupLink()}
        
        </div>
      </div>
    );
  }
});
