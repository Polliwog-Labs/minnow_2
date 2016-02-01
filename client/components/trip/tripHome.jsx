TripHome = React.createClass({
  propTypes: {
    trip: React.PropTypes.object
  },

  getInitialState: function(){
    return {show:false};
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
    var tripId = this.props.trip._id;
    var invite_user = undefined;

    if((invitee_email !== Meteor.user().emails[0].address) && invitee_email.includes('@') &&
      this.props.trip && this.props.trip.pending && this.props.trip.pending.every((invitee)=>{
        return invitee !== invitee_email;
      })){
      // Make sure user isn't inviting themself, email address is an email address,
      // and is not a duplicate, also that trip is loaded into state
      Meteor.call('inviteUserByEmail', invitee_email,tripId,(err,data)=>{
        if(err){
          console.log(err);
        } else {
          if (!data){
            Meteor.call('sendInvitationEmail',invitee_email,this.props.trip,Meteor.user());
          }
        }
      })
      Trips.update({_id:this.props.trip._id},{$push:{'pending':invitee_email}});

    } else this.flashError();
    ReactDOM.findDOMNode(this.refs.input_email).value = null;
  },

  renderInvitees: function(){
    if (this.props.trip && this.props.trip.pending){
      return this.props.trip.pending.map((email,index)=>{
        return <li key={index}>{email}</li>;
      })
    }
  },

  flashError(){
    $('.error-email').show();
    setTimeout(()=>{
      $('.error-email').hide()
    },1000);
  },
  componentWillReceiveProps(newProps){
    this.setState(newProps)
  },

  showModal() {
    this.setState({show: true});
  },

  hideModal() {
    this.setState({show: false});
  },
  render: function(){
    if (this.props.trip){
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
        expense_dash:{}
      };

      for (var key in this.props.trip){
        params[key] = this.props.trip[key];
      };
      var cost = params.expenses.reduce((a,b)=>{
        return {amount: a.amount+b.amount};
      },{amount:0}).amount

      //this.updateExpenseDash();

      return (
      <div className='trip list'>
        <EditTrip onHide={this.hideModal} show={this.state.show} trip={this.props.trip} members={this.props.members} history={this.props.history}/>
         <div className='image-div'>
          <Image image_id={params.image_id} height="300px" />
         </div>
         <div className='item'>
          <h2>{this.props.trip.name || 'Unnamed Trip'}</h2>
          <div className='item item-divider row'>
            <h3 className='col'>{DateUtils.getTripDate(this.props.trip.dates)}</h3>
            <p className='col clear-right'><a onClick={ this.showModal }><i id="pencil" className='ion-edit'></i></a></p>
          </div>
          <div className='item'>
            <p className=''>Whos Coming? {this.props.members.map((member)=>{
              return member.username;
            }).join(', ')} </p>
            <form className='form-group' >
              <p>Invitees:</p>
              <ul>{this.renderInvitees()}</ul>
              <p>Invite attendees by email address:</p>
              <input type="email" placeholder = "Email address" className="item-input" ref="input_email"/>
              <button id="btn-submit" className='btn btn-default' onClick={this.submitInvitees}>Invite</button>
              <span style={{'color':'red','display':'none'}} className="error-email">Bad Email</span>
            </form>
          </div>
        </div>
      </div> )
    } else return <div/>;
  }
});




