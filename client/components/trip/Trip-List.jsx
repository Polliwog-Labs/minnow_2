TripList = React.createClass({
  propTypes: {
    trip: React.PropTypes.object.isRequired
  },

  navToTrip: function(){
    console.log(this.props.trip)
    document.location.href = '/trip/' + this.props.trip._id;
  },

  render: function(){
    var params = {
      _id: null,
      name: 'Unnamed Trip',
      dates: [0,0],
      members: [],
      ideas: [],
      itinerary: [],
      messages: [],
      expenses: [],
      todo: [],
      organizer: [],
    };

    for (var key in this.props.trip){
      this.props.trip[key] && (params[key] = this.props.trip[key]);
      console.log("trip",this.props.trip[key]);
    }

    return (
      <div className="tripListModule" onClick={this.navToTrip} >
          <h2 className="tripListText">{params.name}</h2>
          <h2 className="tripListDateText" >October 31st</h2>
      </div>
    );
  }
})