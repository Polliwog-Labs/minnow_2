MyTrips = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function(){
    var fallbackGarbage = [
                            {
                              name:'Tubing the river',
                              _id:98,
                              members:["","",""],
                              image_url: 'http://blog.adoptandshop.org/wp-content/uploads/2013/07/wet-cat.jpg',
                              itinerary: ["",""]},
                              {name:'Movie, drinks, and dinner',
                              _id:99,
                              members:["","",""],
                              itinerary: ["",""],
                              messages: []
                            }
                          ];
    var myTrips = Trips.find().fetch().sort(function(tripA, tripB){
      return tripA._id > tripB._id;
    });
    return {
      trips: myTrips.length ? myTrips : fallbackGarbage
    }
  },

  newTrip: function(event){
    event.preventDefault();
    Trips.insert({
                  name: ReactDOM.findDOMNode(this.refs.newTrip_name).value,
                  members: [Meteor.userId()],
                  organizers: [Meteor.userId],
                  created_by: Meteor.user().username,
                  messages: [],
                  addresses: []
                  },
                  function(err, id){
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
    return Trips.find({_id: { $in: Meteor.user() ? Meteor.user().profile.myTrips : []}}).fetch().map(function(trip) {
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




