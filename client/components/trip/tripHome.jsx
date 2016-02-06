TripHome = React.createClass({
  propTypes: {
    trip: React.PropTypes.object
  },

  getInitialState: function(){
    return {
      show:false,
      showGoing: false,
      showInvited: false,
      showDeclined: false
    };
  },

  componentDidMount(){
    this.props.updateParent(null);
  },

  shouldComponentUpdate(newprops,newstate){
    if (newprops) return !!(newprops.trip && newprops.members);
    return true;
  },

  keepOpen(close){
    if (close) this.setState({show:false})
    else this.setState({show:true});
  },

  submitInvitees: function(event) {
    event.preventDefault();
    var invitee_email = ReactDOM.findDOMNode(this.refs.input_email).value;
    var invite_user = undefined;

    if((invitee_email !== Meteor.user().emails[0].address) && invitee_email.includes('@') &&
      this.props.trip && this.props.trip.pending && this.props.trip.pending.every((invitee)=>{
        return invitee !== invitee_email;
      })){
      // Make sure user isn't inviting themself, email address is an email address,
      // and is not a duplicate, also that trip is loaded into state
      Meteor.call('inviteUserByEmail', invitee_email,this.props.trip._id,(err,data)=>{
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
    },2000);
  },

  showModal() {
    this.setState({show: true});
  },

  hideModal() {
    this.setState({show: false});
  },

  showGoing() {
    this.setState({ showGoing: true})
  },

  hideGoing() {
    this.setState({ showGoing: false})
  },

  showInvited() {
    this.setState({ showInvited: true})
  },

  hideInvited() {
    this.setState({ showInvited: false})
  },

  showDeclined() {
    this.setState({ showDeclined: true})
  },

  hideDeclined() {
    this.setState({ showDeclined: false})
  },

  render: function(){
    var trip = this.props.trip || {};
    var members = this.props.members || [];
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
      expense_dash:{},
      pending: [],
      declined: []
    };

    for (var key in trip){
      params[key] = this.props.trip[key];
    };
    var cost = params.expenses.reduce((a,b)=>{
      return {amount: a.amount+b.amount};
    },{amount:0}).amount

    return (
       <div className='trip list'>
        <EditTrip onHide={this.hideModal} show={this.state.show} trip={trip} members={this.props.members} history={this.props.history} keepOpen={this.keepOpen}/>
        <GoingModal onHide={this.hideGoing} show={this.state.showGoing} members={this.props.members} history={this.props.history} />
        <InvitedModal onHide={this.hideInvited} show={this.state.showInvited} invites={params.pending} history={this.props.history} />
        <DeclinedModal onHide={this.hideDeclined} show={this.state.showDeclined} declined={this.props.declined} history={this.props.history} />
          <div className='image-div'>
            <Image image_id={params.image_id} height="300px" />
          </div>
          <div className='item trip-layout'>
            <h2 className="dark-blue-text">{params.name}</h2>
            <div className='item item-divider row'>
            <h3 className='col dark-blue-text'>{DateUtils.getTripDate(params.dates)}</h3>
            <p className='col clear-right'><a onClick={ this.showModal }><i id="pencil" className='ion-edit'></i></a></p>
          </div>
          <div className='item dark-blue-text'>
            <div className="row member-btn-container">
              <div className='col'>
                <button className="button button-small button-positive button-outline member-btn" onClick={this.showGoing} >Going</button>
              </div>
              <div className='col'>
                <button onClick={this.showInvited} className="button button-small button-positive button-outline member-btn">Invited</button>
              </div>
              <div className='col'>
                <button onClick={this.showDeclined} className="button button-small button-positive button-outline member-btn">Declined</button>
              </div>
            </div>
            <div className="row member-btn-container">
              <div className='col'>
                <p className='dark-blue-text attend-count'>{params.members.length}</p>
              </div>
              <div className='col'>
                <p className='dark-blue-text attend-count'>{params.pending.length}</p>
              </div>
              <div className='col'>
                <p className='dark-blue-text attend-count'>{params.declined.length}</p>
              </div>
            </div>
            <div className='col' >
              <div className="item item-input-inset invite">
                {/*<a className="button button-icon icon ion-ios-personadd"></a>*/}
                <button id="btn-submit" 
                  className="button button-small button-positive button-outline icon-left ion-ios-personadd" 
                  onClick={this.submitInvitees}>Invite
                </button>
                <label className="item-input-wrapper add-email">
                  <input ref="input_email" type="email" placeholder="Invite by Email"/>
                </label>
              </div>
              <p style={{'color':'red','display':'none'}} className="error-email">Not a valid email address</p>
            </div>
          </div>
        </div>
        {/*<p style={{'color':'red','display':'none'}} className="error-email">Bad Email</p>
            <p className="dark-blue-text">Whos Coming? {this.props.members.map((member)=>{
              return member.username;
            }).join(', ')} </p>
            {/*<p className=''>Action Items {params.todo.length}</p>*/}
            {/*<p className='tripParams'>Est. Cost Per Person: ${cost / (params.members.length || 1)}</p>*/}
            {/*<form className='form-group' >
              <p className="dark-blue-text">Invitees:</p>
              <ul>{this.renderInvitees()}</ul>
              <p className="dark-blue-text">Send your friends an invite:</p>
              <input type="email" placeholder = "Email address" className="item-input" ref="input_email"/>
              <button id="btn-submit" className='button button-positive ' onClick={this.submitInvitees}>Invite</button>
            </form>*/}

      </div> )
  }
});

