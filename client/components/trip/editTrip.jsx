EditTrip = React.createClass({
  propTypes: {
    trip: React.PropTypes.object
  },
  getInitialState: function(){
    return {
      organizers:null,
      photo:null
    };
  },
  getHelperObj(image_id){
    var helperObj = {dates:[]};
    if (image_id) helperObj.image_id = image_id;
    if (this.state.organizers) helperObj.organizers = this.state.organizers;
    var name = ReactDOM.findDOMNode(this.refs.tripName).value;
    if (name) helperObj.name = name;
    var startDate = new Date(ReactDOM.findDOMNode(this.refs.newTrip_startDate).value).getTime();
    if (startDate && startDate !== NaN) helperObj.dates.push(startDate);
    var endDate = new Date(ReactDOM.findDOMNode(this.refs.newTrip_endDate).value).getTime();
    if (helperObj.dates[0] && endDate && endDate !== NaN) helperObj.dates.push(endDate);
    if (!helperObj.dates.length) delete helperObj.dates;
    return helperObj;
  },
  updateOrganizers(organizers){
    this.setState({organizers:organizers})
  },
  submitTrip: function(event){
    event.preventDefault();
    var helperObj = this.getHelperObj();
    var file = this.state.photo || $('#newTrip-file')[0].files[0] || null;
    if (file) {
      Images.insert(file,(err,data)=>{
        this.setState({photo:null});
        if (err) console.log(err)
        else {
          Trips.update({_id:this.props.trip._id},{$set:$.extend(helperObj,{image_id:data._id})});
        }
      })
    } else Trips.update({_id:this.props.trip._id},{$set:this.getHelperObj()});
    this.props.keepOpen('close');
  },
  takePic(){
    MeteorCamera.getPicture({
       height: 600,
       width: 800,
       correctOrientation: true
    },(err,data)=>{
      this.props.keepOpen();
      !err && this.setState({photo:data});
    })
  },
  getCameraButton(){
    return ShowCamera ? <button className="dark-blue-text bg-ice" onClick={this.takePic}>Take Picture</button> : <div/>
  },
  render: function(){
    var startDate = (this.props.trip && this.props.trip.dates && this.props.trip.dates[0]) ? DateUtils.getHTMLDate(this.props.trip.dates[0]) : DateUtils.getHTMLDate(new Date().getTime());
    var endDate = (this.props.trip && this.props.trip.dates && this.props.trip.dates[1]) ? DateUtils.getHTMLDate(this.props.trip.dates[1]) : startDate;
    return (
      <div>
        <ReactBootstrap.Modal
          {...this.props}
          onHide={this.props.onHide}
          dialogClassName="custom-modal"
          >
          <ReactBootstrap.Modal.Header closeButton>
            <ReactBootstrap.Modal.Title id="contained-modal-title-lg dark-blue-text">Edit Trip</ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
          <div className='list'>
              <form id='newTrip-form' className='form-group' onSubmit={this.submitTrip}>
                <label className="item dark-blue-text item-input item-stacked-label">
                  <span>{this.props.trip ? this.props.trip.name : 'Enter a Name'}</span>
                  <input className="bg-ice" id="newTrip-name" type="text" ref="tripName" placeholder="Trip Name"/>
                </label>
                <div className="row item bg-ice">
                  <div className='col-50 bg-ice'>
                    <label className="dark-blue-text item-stacked-label bg-ice">
                      <span className="dark-blue-text bg-ice">Start Date</span>
                      <input className="dark-blue-text bg-ice item-input" type="date" ref="newTrip_startDate" defaultValue={startDate} />
                    </label>
                  </div>
                  <div className='col-50'>
                    <label className="dark-blue-text item-stacked-label bg-ice">
                      <span className="dark-blue-text bg-ice">End Date</span>
                      <input className="dark-blue-text bg-ice item-input" type="date" ref="newTrip_endDate" defaultValue={endDate} />
                    </label>
                  </div>
                </div>
                <AddOrganizer trip={this.props.trip} members={this.props.members} update={this.updateOrganizers}/>
                <label id="newTrip-members" className="dark-blue-text item item-input item-stacked-label bg-ice">
                  <span>Upload a photo</span>
                  <input id="newTrip-file" className="dark-blue-text item-input bg-ice" type="file" accept="image/*" capture="camera" ref="newTrip_file"/>
                  {this.getCameraButton()}
                  <span>{this.state.photo ? 'Camera Photo' : ''}</span>
                </label>
                <button id="btn-submit" className='button button-block button-positive'>Submit</button>
              </form>
              <DeleteTrip trip={this.props.trip} history={this.props.history} keepOpen={this.props.keepOpen}/>
           </div>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
      </div> 
    );
  }
})
