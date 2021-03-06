InviteList = React.createClass({
	propTypes: {
    trip: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {organizer: null}
  },

  componentDidMount: function(){
    Meteor.call('getOrganizer',this.props.trip,(err,data)=>{
      !err && this.setState({organizer:data.username});
    })
  },

  navToTrip: function(){
    Meteor.user() && Meteor.call('inviteAccepted', Meteor.user(), this.props.trip, (err, data) => {
      if(err) {
        console.log(err);
      }  else {
         this.props.history.push('/trip/' + this.props.trip._id);
       }
     })
  },
  declineTrip: function(){
    Meteor.user() && Meteor.call('inviteDeclined', Meteor.user(), this.props.trip._id, (err, data) => {
      if(err) {
        console.log(err);
      }
    })
  },
  renderButtons(){
    if (Meteor.user()) return (
      <div className="right-float">
        <button className="button button-positive button-small" onClick={this.navToTrip}>
          Accept
        </button>
        <button className="button button-decline button-small" onClick={this.declineTrip}>
          Decline
        </button>
      </div>
    );
  },
  render: function(){
    var tripStart = (this.props.trip && this.props.trip.dates) ? DateUtils.getTripDate(this.props.trip.dates) : null;
    return (
      <div className="list align-left">
		    <a className="item item-thumbnail-left height-fix bg-ice">
          <Image image_id={this.props.trip.image_id} />
		      <h2 className="h-invite-override">{this.props.trip.name}</h2>
		      <p>{this.state.organizer}</p>
		      <p>{tripStart}</p>
          {this.renderButtons()}
        </a>
		  </div>
    );
	}
})
