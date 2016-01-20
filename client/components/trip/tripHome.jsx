TripHome = React.createClass({
  render: function(){
    console.log('rendered');
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
    };
    
    for (var key in this.props.trip){
      params[key] = this.props.trip[key];
    };
    return (
      <div className='trip'>
        <h1>Trip Home</h1>
        <h3>{params.name}</h3>
        <p className='tripParams'>From {new Date(params.dates[0]).toString()} to {new Date(params.dates[1]).toString()}</p>
        <Image image_id={params.image_id} height="300px"/>
        <p className='tripParams'>Attendees: {params.members.join(', ')}</p>
        <p className='tripParams'>{params.itinerary.length} Events</p>
        <p className='tripParams'>{params.messages.length} Messages</p>
        <p className='tripParams'>{params.todo.length} Action Items</p>
        <p className='tripParams'>Est. Cost: ${params.expenses.length ? 'Some Number' : 0}</p>
        <a href='/alltrips'>Go back home</a>
      </div>
    )
  }
});