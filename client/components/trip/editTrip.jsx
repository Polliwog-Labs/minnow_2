EditTrip = React.createClass({
  propTypes: {
    trip: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {image_id:null};
  },
  updateTrip: function(invitees, image_id){
    Meteor.call('updateTrip',{
      trip_id: this.props.trip._id,
      name: ReactDOM.findDOMNode(this.refs.newTrip_name).value,
      members: invitees,
      dates: [new Date(ReactDOM.findDOMNode(this.refs.newTrip_startDate).value).getTime(),
              new Date(ReactDOM.findDOMNode(this.refs.newTrip_endDate).value).getTime()
             ],
      image_id: image_id
     },(err, id)=>{
      if (err) {console.log(err);}
      else {
        this.props.updateParent('EditTrip');
      }
    });
  },
  submitTrip: function(event){
    event.preventDefault();
    var file = $('#newTrip-file')[0].files[0] || ReactDOM.findDOMNode(this.refs.newTrip_url).value || {};
    var invitees = ReactDOM.findDOMNode(this.refs.newTrip_members).value.replace(/\s/,'').split(',').filter(function(address){
      return /^[\w,\.,-]+@[\w,\.,-]+\.[a-z]{2,3}$/.test(address);
    });
    if (typeof file === 'string'){
      Meteor.call('storeImage',file,(err,data)=>{
        if (err) console.log(err)
        else {
          this.updateTrip(invitees,data._id);
        }
      });
    } else if (file.constructor === File) {
      Images.insert(file,(err,data)=>{
        if (err) console.log(err)
        else {
          this.updateTrip(invitees,data._id);
        }
      })
    } else this.updateTrip(invitees,this.props.trip.image_id);
  },
  render: function(){
    return (
      <div className='list'>
        <div className='item'>
          <form id='newTrip-form' className='form-group' onSubmit={this.submitTrip}>
            <p>Enter a name for your new trip</p>
            <input id="newTrip-name" type="text" defaultValue={this.props.trip.name || 'Enter a Name'} className="item-input" ref="newTrip_name"/>
            <p>Start Date</p>
            <input type="date" className="item-input" ref="newTrip_startDate"/>
            <p>End Date</p>
            <input type="date" className="item-input" ref="newTrip_endDate"/>
            <p>Invite attendees by email address:</p>
            <input id="newTrip-members" type="text" placeholder = "Invitees" className="item-input" ref="newTrip_members"/>
            <p>Add a picture (optional)</p>
            <input id="newTrip-url" type="text" placeholder = "URL" className="item-input" ref="newTrip_url"/>
            <p>OR</p>
            <input id="newTrip-file" type="file" className="item-input" ref="newTrip_file"/>
            <button id="btn-submit" className='btn btn-default'>Submit</button>
          </form>
          <Image image_id={this.state.image_id || this.props.trip.image_id} height="400px" />
          <p><a href='/mytrips'>Go back home</a></p>
        </div>
      </div>
    );
  }
})
