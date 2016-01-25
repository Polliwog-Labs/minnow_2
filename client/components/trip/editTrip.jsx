EditTrip = React.createClass({
  propTypes: {
    trip: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {image_id:null, hide:false};
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

  hideModal() {
    this.setState({hide:true});
  },

  render: function(){
    return (
      <div>
        <ReactBootstrap.Modal 
          {...this.props}
          onHide={this.props.onHide}
          dialogClassName="custom-modal">
          <ReactBootstrap.Modal.Header closeButton>
            <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Edit Trip</ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>  
          <div className='list'>
              <form id='newTrip-form' className='form-group' onSubmit={this.submitTrip}>
                <label className="item item-input item-stacked-label">
                  <span>{this.props.trip.name || 'Enter a Name'}</span>
                  <input id="newTrip-name" type="text" ref="newTrip_name" placeholder="Trip Name"/>
                </label>
                <div className="row item">
                  <div className='col-50'>
                    <label className="item-stacked-label">
                      <span>Start Date</span>
                      <input className="item-input" id="newTrip-name" type="date" ref="newTrip_startDate"/>
                    </label>
                  </div>
                  <div className='col-50'>
                    <label className="item-stacked-label">
                      <span>End Date</span>
                      <input className="item-input" id="newTrip-name" type="date" ref="newTrip_endDate"/>
                    </label> 
                  </div>
                </div>
                <label id="newTrip-members" className="item item-input item-stacked-label">
                  <span>Invite members by email address:</span>
                  <input className="item-input" id="newTrip-name" type="text" ref="newTrip_members"/>
                </label>
                <label id="newTrip-members" className="item item-input item-stacked-label">
                  <span>Add a picture URL (optional)</span>
                  <input id="newTrip-url" className="item-input" id="newTrip-name" type="text" ref="newTrip_url"/>
                </label>
                <span className='item shrink-item'>OR</span>
                <label id="newTrip-members" className="item item-input item-stacked-label">
                  <span>Upload a photo (optional)</span>
                  <input id="newTrip-file" className="item-input" id="newTrip-name" type="file" ref="newTrip_file"/>
                </label>
                <button id="btn-submit" className='button button-block button-positive'>Submit</button>
              </form>
              <p><a href='/mytrips'>My Trips</a></p>
              <div className='image-div'>
                <Image image_id={this.state.image_id || this.props.trip.image_id} height="100%" />
              </div>
           </div>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
      </div>
       
    );
  }
})
