MyInvites = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var user = Meteor.user() || window.location.pathname.substring(9);
    var invites = Meteor.subscribe('Invites',user);
    var data = {};
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
      if (Meteor.user()){
        // Meteor.call('getInvitesByUser',Meteor.user(),(err,data)=>{
        //   !err && this.setState({trips:data});
        // });
      } else {
        // Meteor.call('getTripsFromInvites',this.data.invites,(err,data)=>{
        //   !err && this.setState({trips:data});
        // })
      }
    },800);
	},

  renderTrips: function(){
    if (this.state.trips.length){
      return this.state.trips.map(trip=>{
        return (
          <InviteList key={trip._id} trip={trip}/>
        );
      })
    } else return (<p>No trips found!</p>);
  },

  renderSignupLink(){
    if (!Meteor.user()){
      return (
        <div>
          <a href="/signup">Sign up for Minnow to join these trips!</a>
        </div>
      );
    }
  },

  render: function(){
    return (
      <div className='list'>
        <h2>My Invites</h2>
        {this.renderTrips()}
        {this.renderSignupLink()}
      </div>
    );
  }
});
