TripHome = React.createClass({
  propTypes: {
    trip: React.PropTypes.object
  },

  getInitialState: function(){
    return $.extend(this.props.trip,{show:false});
  },

  renderList: function() {
    document.location.href = '/mytrips';
  },

  componentWillReceiveProps: function(newprops) {
    this.setState(newprops);
  },

  getTripData: function (view) {
    Meteor.call('getTripById',document.location.pathname.substring(6),(err,data)=>{
      if (err) console.log(err)
      else {
        this.setState({trip:data,
                       view:view});
      }
    });
  },

  submitInvitees: function(event) {
    event.preventDefault();
    var invitee_email = ReactDOM.findDOMNode(this.refs.input_email).value;
    var tripId = this.state.trip._id;
    var invite_user = undefined;

    if((invitee_email !== Meteor.user().emails[0].address) && invitee_email.includes('@') &&
      this.props.trip && this.props.trip.pending && this.props.trip.pending.every((invitee)=>{
        return invitee.emails[0].address !== invitee_email;
      })){
      // Make sure user isn't inviting themself, email address is an email address,
      // and is not a duplicate, also that trip is loaded into state
      Meteor.call('inviteUserByEmail', invitee_email,tripId,(err,data)=>{
        if(err){
          console.log(err);
        } else {
          if (!data){
             this.flashError();
             return;
          }
          Meteor.call('sendInvitationEmail',invitee_email,this.props.statetrip);
        }
      })

    } else this.flashError();
    ReactDOM.findDOMNode(this.refs.input_email).value = null;
  },

  renderInvitees: function(){
    if (this.props.trip && this.props.trip.pending){
      return this.props.trip.pending.map((user,index)=>{
        return <li key={index}>{user.emails[0].address}</li>;
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
    var cost = params.expenses.reduce((a,b)=>{
      return {amount: a.amount+b.amount};
    },{amount:0}).amount


    return (
       <div className='trip list'>
        <EditTrip updateParent={this.getTripData} onHide={this.hideModal} show={this.state.show} trip={this.props.trip}/>
         <div className='image-div'>              
          <Image image_id={params.image_id} height="100%" />
         </div>
         <div className='item'>   
          <div className='item'>
            <p className=''>Whos Coming? {this.props.members.map((member)=>{
              return member.username;
            }).join(', ')} </p>
            {/*<p className=''>Action Items {params.todo.length}</p>*/}
            {/*<p className='tripParams'>Est. Cost Per Person: ${cost / (params.members.length || 1)}</p>*/}
            <form className='form-group' >
              <p>Invitees:</p>
              <ul>{this.renderInvitees()}</ul>
              <p>Invite attendees by email address:</p>
              <input type="email" placeholder = "Email address" className="item-input" ref="input_email"/>
              <button id="btn-submit" className='btn btn-default' onClick={this.submitInvitees}>Submit</button>
              <span style={{'color':'red','display':'none'}} className="error-email">Bad Email</span>
            </form>
            <div className='row edit-row'>
              <p className='col-50'>Est. Cost: ${params.expenses.length ? '500' : 0}</p>
              <p className='col-25'></p>
              <p className='col_25'><a onClick={ this.showModal }><i id="pencil" className='ion-edit'></i></a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});




