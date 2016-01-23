TripHome = React.createClass({
  propTypes: {
    trip: React.PropTypes.object
  },

  getInitialState: function(){
    return {trip: this.props.trip};
  },

  renderList: function() {
    document.location.href = '/mytrips';
  },

  componentWillReceiveProps: function(newprops) {
    this.setState(newprops);
  },

  submitInvitees: function(event) {
    event.preventDefault();
    var invitee_email = ReactDOM.findDOMNode(this.refs.input_email).value;
    var tripId = this.state.trip._id;
    if ((invitee_email !== Meteor.user().emails[0].address) && invitee_email.includes('@') &&
      this.state.trip.pending.every((invitee)=>{
        return invitee.emails[0].address !== invitee_email;
      })){
      // Make sure user isn't inviting themself, email address is an email address,
      // and is not a duplicate.
      Meteor.call('inviteUserByEmail', invitee_email,tripId,(err,data)=>{
        if(err){
          console.log(err);
        } else {
          if (!data){
             this.flashError();
             return;
          }
          this.props.updateParent();
        }
      });
    } else this.flashError();
    ReactDOM.findDOMNode(this.refs.input_email).value = null;
  },

  renderInvitees: function(){
    return this.state.trip.pending.map((user,index)=>{
      return <li key={index}>{user.emails[0].address}</li>;
    })
  },
  flashError(){
    $('.error-email').show();
    setTimeout(()=>{
      $('.error-email').hide()
    },1000);
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

    for (var key in this.state.trip){
      params[key] = this.state.trip[key];
    };
    var cost = params.expenses.reduce((a,b)=>{
      return {amount: a.amount+b.amount};
    }).amount


    return (

      <div className='trip list'>
        <div className='item'>
          <div className ="">
            <Image image_id={params.image_id} height="300px" />
            <p className='tripParams'>Attendees: {/*params.members.join(', ')*/}</p>
            <p className='tripParams'>{params.itinerary.length} Events</p>
            <p className='tripParams'>{params.messages.length} Messages</p>
            <p className='tripParams'>{params.todo.length} Action Items</p>
            <p className='tripParams'>Est. Cost Per Person: ${cost / (params.members.length || 1)}</p>

            <form className='form-group' >
            <p>Invitees:</p>
            <ul>{this.renderInvitees()}</ul>
            <p>Invite attendees by email address:</p>
            <input type="email" placeholder = "Email address" className="item-input" ref="input_email"/>
            <button id="btn-submit" className='btn btn-default' onClick={this.submitInvitees}>Submit</button>
            <span style={{'color':'red','display':'none'}} className="error-email">Bad Email</span>

          </form>

            <button onClick={this.renderList}>Go back home</button>
          </div>
      </div>
    </div>
    )
  }
});




