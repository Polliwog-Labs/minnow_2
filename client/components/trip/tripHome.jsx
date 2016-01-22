TripHome = React.createClass({
  mixins: [ReactMeteorData],
  propTypes: {
    trip: React.PropTypes.object
  },
  getMeteorData() {
    var tripid = this.props.trip ? this.props.trip._id : document.location.pathname.substring(6); 
    return {trip:Trips.findOne({_id: tripid})};
  },
  renderList: function() {
    document.location.href = '/mytrips';
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
      organizers: [],
      expenses: [],
      expense_dash:[]
    };
    
    for (var key in this.data.trip){
      params[key] = this.data.trip[key];
    };
    return (
      <div className='trip list'>
        <div className='item'>
          <div className ="">
            <Image image_id={params.image_id} height="300px" />
            <p className='tripParams'>Attendees: {params.members.join(', ')}</p>
            <p className='tripParams'>{params.itinerary.length} Events</p>
            <p className='tripParams'>{params.messages.length} Messages</p>
            <p className='tripParams'>{params.todo.length} Action Items</p>
            <p className='tripParams'>Est. Cost: ${params.expenses.length ? 'Some Number' : 0}</p>
            <button onClick={this.renderList}>Go back home</button>
          </div>
      </div>
    </div>
    )
  }
});