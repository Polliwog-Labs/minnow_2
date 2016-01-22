MyTrips = React.createClass({
  getInitialState(){
    return {trips:[]};
  },
  componentDidMount(){
    setTimeout(()=>{
      Meteor.call('getTripsByUser',Meteor.user(),(err,data)=>{
        if (err) console.log(err)
        else this.setState({trips:data});
      });
    },500);
  },
  newTrip: function(event){
    event.preventDefault();
    Trips.insert({
                  name: ReactDOM.findDOMNode(this.refs.newTrip_name).value,
                  members: [Meteor.userId()],
                  organizers: [Meteor.userId],
                  created_by: Meteor.user().username,
                  messages: [],
                  expenses: [],
                  expense_dash: []
                  }, 
                  function(err, id){
                    if (err){ 
                      console.error("error inserting into DB", err)
                    } else {
                      console.log(id)    
                      Meteor.users.update(Meteor.userId(), {$push: {"profile.myTrips": id}});
                      document.location.href='/trip/'+id;
                    }
              });
  },
  renderTrips: function(){
    return this.state.trips.map(trip=>{
      return (
        <TripList key={trip._id} trip={trip}/>
      );
    })
  },
  render: function(){
    return (
      <div className='list'>
        <h2>My Trips</h2>
        <div className='item item-input-inset row'>
          <label className='item-input-wrapper'>
            <input type='text' placeholder='Trip Name' ref="newTrip_name"/>
          </label>
          <button className="button button-small button-positive" onClick={this.newTrip}>New Trip</button>
        </div>
        {this.renderTrips()}
      </div>
    );
  }
})




