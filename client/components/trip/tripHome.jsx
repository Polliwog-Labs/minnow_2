TripHome = React.createClass({
  propTypes: {
    trip: React.PropTypes.object
  },

  renderList: function() {
    document.location.href = '/mytrips';
  },

  submitInvitees: function(event) {
    event.preventDefault();
    var invitee_email = ReactDOM.findDOMNode(this.refs.input_email).value;
    var email = this.props.trip.created_by.emails[0].address;
    var tripId = this.props.trip._id;


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

    for (var key in this.props.trip){
      params[key] = this.props.trip[key];

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

            <form className='form-group' >
            <p>Invite attendees by email address:</p>
            <input type="email" placeholder = "Email address" className="item-input" ref="input_email"/>
            <button id="btn-submit" className='btn btn-default' onClick={this.submitInvitees}>Submit</button>
          </form>

            <button onClick={this.renderList}>Go back home</button>
          </div>
      </div>
    </div>
    )
  }
});




