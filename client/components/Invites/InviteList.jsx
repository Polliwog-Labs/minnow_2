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
    Meteor.user() && Meteor.call('inviteAccepted', Meteor.userId(), this.props.trip._id, (err, data) => {
      if(err) {
        console.log(err);
      }  else {
        document.location.href = '/trip/' + this.props.trip._id;
      }
    })
  },
  renderButtons(){
    if (Meteor.user()) return (
      <div>
        <button className="button button-small button-balanced" onClick={this.navToTrip}>
          Accept
        </button>
        <button className="button button-small button-assertive">
          Decline
        </button>
      </div>
    );
  },

  render: function(){
    var tripStart = this.props.trip.dates ? (this.props.trip.dates[0] || 'October 32nd') : 'October 32nd';
    return (
      <div className="list">
		    <a className="item item-thumbnail-left">
          <Image image_id={this.props.trip.image_id} />
		      <h2>{this.props.trip.name}</h2>
		      <p>{this.state.organizer}</p>
		      <p>{tripStart}</p>
          {this.renderButtons()}
		    </a>
		  </div>
    );
	}
})
