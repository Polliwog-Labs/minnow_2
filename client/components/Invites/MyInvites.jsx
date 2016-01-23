MyInvites = React.createClass({

	 getInitialState(){
	    return {trips:[]};
	  },
		
	 componentDidMount(){
	    setTimeout(()=>{
	      Meteor.call('getTripsByUser',Meteor.user(),(err,data)=>{
	        !err && this.setState({trips:data});
	      });
	    },800);
	},
		    // Meteor.users.update(Meteor.userId(), {$push: {"profile.myTrips": id}});

  renderTrips: function(){
    return this.state.trips.map(trip=>{
      return (
        <InviteList key={trip._id} trip={trip}/>
      )
    })
  },

  render: function(){
    return (
      <div className='list'>
        <h2>My Invites</h2>
        {this.renderTrips()}
      </div>
    );
  }
});
