AllTrips = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function(){
    var fallbackGarbage = [
                            {name:'Tubing the river',
                            _id:98,
                            members:["","",""],
                            image_url: 'http://blog.adoptandshop.org/wp-content/uploads/2013/07/wet-cat.jpg',
                            itinerary: ["",""]}, 
                            {name:'Movie, drinks, and dinner',
                            _id:99,
                            members:["","",""],
                            itinerary: ["",""]} 
                          ];
    var myTrips = Trips.find().fetch().sort(function(tripA, tripB){
      return tripA._id > tripB._id;
    });
    return {
      trips: myTrips.length ? myTrips : fallbackGarbage
    }
  },

  newTrip : function(){
    document.location.href = "/newtrip"
  },

  renderTrips: function(){
    return this.data.trips.map(function(trip){
      return (
        <TripList key={trip._id} trip={trip}/>
      );
    });
  },
  render: function(){
    return (
      <div className='list'>
        <div className='item-input-inset'>
          <label className='item-input-wrapper'>
            <input type='text' placeholder='Trip Name'/>
          </label>
          <button className="button button-small button-positive" onClick={this.newTrip}>New Trip</button>
        </div>
      <h1>My Trips</h1>
        {this.renderTrips()}
      </div>
    );
  }
})




