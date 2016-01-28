NewTrip = React.createClass({
  submitTrip: function(event){
    event.preventDefault();
    var user = Meteor.userId()
    Trips.insert({name: ReactDOM.findDOMNode(this.refs.newTrip_name).value,
                  members: [Meteor.userId()],
                  organizers: [Meteor.userId()],
                  messages: [],
                  ideas: [],
                  pending: [],
                  expense_dash:[{user: {}}],
                  expenses:[],
                  dates: []
                }, function(err, id){
      if (err) {console.log(err);}
      else {
        console.log('id: ', id)
        Meteor.users.update(Meteor.userId(), {$push: {"profile.myTrips": id}});
        document.location.href='/trip/'+id + '/home';
      }
    });
  },

  render: function(){
    return (
      <div className='list'>
        <div className='item'>
          <form id='newTrip-form' className='form-group' onSubmit={this.submitTrip}>
            <p>Enter a name for your new trip</p>
            <input id="newTrip-name" type="text" placeholder = "Name" className="item-input" ref="newTrip_name"/>
            <p>Start Date</p>
            <input type="date" placeholder={new Date().toString()} className="item-input" ref="newTrip_startDate"/>
            <p>End Date</p>
            <input type="date" placeholder={new Date().toString()} className="item-input" ref="newTrip_endDate"/>
            <p>Invite attendees by email address:</p>
            <input id="newTrip-members" type="text" placeholder = "Invitees" className="item-input" ref="newTrip_members"/>
            <p>Add a picture (optional)</p>
            <input id="newTrip-url" type="text" placeholder = "URL" className="item-input" ref="newTrip_url"/>
            <button id="btn-submit" className='btn btn-default'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
})
