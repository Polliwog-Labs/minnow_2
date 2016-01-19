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
    }

    return (
      <div className='list trip-list'>
        <div className='item item-thumbnail-left' onClick={this.navToTrip}>
          <Image image_id={params.image_id} height="100px" />
          <h3>{params.name}</h3>
          <p>From {new Date(params.dates[0]).toString()} to {new Date(params.dates[1]).toString()}</p>
          <p>Created By: {params.created_by}</p>

        </div>
      </div>
    );
  }
})