MyTrips = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var data = {trips:[]};
    if (Meteor.user()) var trips = Meteor.subscribe("myTrips",Meteor.user());
    trips.ready() && (data.trips = Trips.find().fetch());
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
        console.log(id)
        Meteor.users.update(Meteor.userId(), {$push: {"profile.myTrips": id}});
        document.location.href='/trip/'+id;
      }
    });

  },
  renderTrips: function(){
    return this.data.trips.sort((a,b)=>{
      return a.dates[0] - b.dates[0];
    }).map(trip=>{
      return (
        <TripList key={trip._id} trip={trip}/>
      );
    })
  },
  render: function(){
    return (
      <div className='list'>
        <h2>My Trips</h2>
        <div className='item item-input-inset row'>
          <label className='item-input-wrapper'>
            <input type='text' placeholder='Trip Name' ref="newTrip_name"/>
          </label>
          <button className="button button-small button-positive" onClick={this.newTrip}>New Trip</button>
        </div>
        {this.renderTrips()}
      </div>
    );
  }
})




