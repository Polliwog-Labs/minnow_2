EditTrip = React.createClass({
  mixins:[ReactMeteorData],
  propTypes: {
    trip: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {image_id:null};
  },
  getMeteorData: function(){
    return {trip:Trips.findOne({_id: this.props.trip._id})};
  },
  updateTrip: function(invitees, image_id){
    Trips.update({_id:this.props.trip._id},{$set: {
                  name: ReactDOM.findDOMNode(this.refs.newTrip_name).value,
                  members: invitees,
                  dates: [new Date(ReactDOM.findDOMNode(this.refs.newTrip_startDate).value).getTime(),
                          new Date(ReactDOM.findDOMNode(this.refs.newTrip_endDate).value).getTime()
                         ],
                  image_id: image_id
                }}, (err, id)=>{
      if (err) {console.log(err);}
      else {
        console.log('id: ', id)
        this.setState({image_id:image_id});
      }
    });
  },
  submitTrip: function(event){
    event.preventDefault();
    var file = $('#newTrip-file')[0].files[0] || ReactDOM.findDOMNode(this.refs.newTrip_url).value
    var invitees = ReactDOM.findDOMNode(this.refs.newTrip_members).value.replace(/\s/,'').split(',').filter(function(address){
      return /^[\w,\.,-]+@[\w,\.,-]+\.[a-z]{2,3}$/.test(address);
    });
    if (typeof file === 'string'){
      Meteor.call('storeImage',file,(err,data)=>{
        if (err) console.log(err)
        else this.updateTrip(invitees,data._id);
      });
    } else if (file.constructor === File) {
      Images.insert(file,(err,data)=>{
        if (err) console.log(err)
        else this.updateTrip(invitees,data._id);
      })
    } else console.log('something went wrong uploading a file');
  },
  render: function(){
    return (
      <div className='list'>
        <div className='item'>
          <form id='newTrip-form' className='form-group' onSubmit={this.submitTrip}>
            <p>Enter a name for your new trip</p>
            <input id="newTrip-name" type="text" defaultValue={this.data.trip ? this.data.trip.name : 'Enter a Name'} className="item-input" ref="newTrip_name"/>
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
          <Image image_id={this.state.image_id || this.data.trip.image_id} height="400px" />
          <p><a href='/mytrips'>Go back home</a></p>
        </div>
      </div>
    );
  }
})
