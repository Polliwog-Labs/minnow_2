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
    var userId = Meteor.userId;
    var tripId = this.props.trip._id;

    Meteor.call('inviteAccepted', Meteor.user(), this.props.trip._id, (err, data) => {
      if(err) {
        console.log(err);
      }  else {
         document.location.href = '/trip/' + this.props.trip._id;
       }
     })
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
		       <button className="button button-small button-balanced" onClick={this.navToTrip}>
				  Accept
				</button>
				<button className="button button-small button-assertive">
				  Decline
				</button>
		    </a>
		</div>
      )
	}
})
