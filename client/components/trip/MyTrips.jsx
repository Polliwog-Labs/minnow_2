MyTrips = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var data = {trips:[]};
    var trips = Meteor.subscribe("myTrips",Meteor.user());
    if (trips.ready()) data.trips = Trips.find().fetch();
    return data;
  },

  newTrip: function(event){
    event.preventDefault();
    var username = Meteor.user().username
    Meteor.call('createTrip',{
      name: ReactDOM.findDOMNode(this.refs.newTrip_name).value,
      user: Meteor.user()
    },(err,id)=>{
      if (err){
        console.error("error inserting into DB", err)
      } else {
        Meteor.users.update(Meteor.userId(), {$push: {"profile.myTrips": id}});
        this.props.history.push('/trip/'+ id);
      }
    });
  },
  renderTrips: function(){
   if(this.data.trips.length > 0){
    return this.data.trips.sort((a,b)=>{
      return a.dates[0] - b.dates[0];
    }).map(trip=>{
      return (
        <TripList history={this.props.history} key={trip._id} trip={trip}/>
      );
    })
   }
    if (this.data.trips.length === 0) {
     return (<div className="opaque-bg no-trips"><p className="no-invites">You currently have no trips! Create one above.</p></div>);
    }
    },
  render: function(){
    return (
       <div className='list'>

        <div className="header-center">
          <h2 className="header-override">My Trips</h2>
        </div>
        <div className='item item-input-inset row'>
          <label className='item-input-wrapper'>
            <input type='text' placeholder='Trip Name' ref="newTrip_name"/>
          </label>
          <button type="submit" className="button button-small button-positive" onClick={this.newTrip}>New Trip</button>
        </div>
        {this.renderTrips()}
      </div>
    );
  }
})




