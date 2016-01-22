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
            <div className='image-div'>
              <Image image_id={params.image_id} height="100%" />
            </div>
            <div className='item'>
              <p className=''>Who's Coming? {params.members.join(', ')} </p>
              <p className=''>Events {params.itinerary.length} </p>
              <p className=''>Messages {params.messages.length}</p>
              <p className=''>Action Items {params.todo.length}</p>
              <div className='row edit-row'>
                <p className='col-50'>Est. Cost: ${params.expenses.length ? '500' : 0}</p>
                <p className='col-25'></p>
                <p className='col_25'><i className='ion-edit'></i></p>
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }
});