EditTrip = React.createClass({
  propTypes: {
    trip: React.PropTypes.object
  },
  getInitialState: function(){
    return {
      organizers:null, 
      hide:false
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
    var helperObj = this.getHelperObj()
    var file = $('#newTrip-file')[0].files[0] || ReactDOM.findDOMNode(this.refs.newTrip_url).value || {};
    if (typeof file === 'string'){
      Meteor.call('storeImage',file,(err,data)=>{
        if (err) console.log(err)
        else {
          Trips.update({_id:this.props.trip._id},{$set:$.extend(helperObj,{image_id:data._id})},(err,data)=>{
            err && console.log(err);
            data && console.log(data);
          });
        }
      });
    } else if (file.constructor === File) {
      Images.insert(file,(err,data)=>{
        if (err) console.log(err)
        else {
          Trips.update({_id:this.props.trip._id},{$set:this.getHelperObj(data._id)});
        }
      })
    } else Trips.update({_id:this.props.trip._id},{$set:this.getHelperObj()});
    $('.close').click();
  },
  renderOrganizerChanger(){
    if (this.props.trip && this.props.trip.organizers.includes(Meteor.userId())){
      return <AddOrganizer trip={this.props.trip} members={this.props.members} update={this.updateOrganizers}/>
    }
  },
  renderDeleteButton(){
    if (this.props.trip && this.props.trip.organizers.includes(Meteor.userId())){
      return <DeleteTrip trip={this.props.trip}/>
    }
  },

  render: function(){
    var startDate = (this.props.trip && this.props.trip.dates && this.props.trip.dates[0]) ? DateUtils.getHTMLDate(this.props.trip.dates[0]) : DateUtils.getHTMLDate(new Date().getTime());
    var endDate = (this.props.trip && this.props.trip.dates && this.props.trip.dates[1]) ? DateUtils.getHTMLDate(this.props.trip.dates[1]) : startDate;
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
                  <span>{this.props.trip ? this.props.trip.name : 'Enter a Name'}</span>
                  <input id="newTrip-name" type="text" ref="tripName" placeholder="Trip Name"/>
                </label>
                <div className="row item">
                  <div className='col-50'>
                    <label className="item-stacked-label">
                      <span>Start Date</span>
                      <input className="item-input" type="date" ref="newTrip_startDate" defaultValue={startDate} />
                    </label>
                  </div>
                  <div className='col-50'>
                    <label className="item-stacked-label">
                      <span>End Date</span>
                      <input className="item-input" type="date" ref="newTrip_endDate" defaultValue={endDate} />
                    </label> 
                  </div>
                </div>
                {this.renderOrganizerChanger()}
                <label id="newTrip-members" className="item item-input item-stacked-label">
                  <span>Add a picture URL (optional)</span>
                  <input id="newTrip-url" className="item-input" type="text" ref="newTrip_url"/>
                </label>
                <span className='item shrink-item'>OR</span>
                <label id="newTrip-members" className="item item-input item-stacked-label">
                  <span>Upload a photo (optional)</span>
                  <input id="newTrip-file" className="item-input" type="file" ref="newTrip_file"/>
                </label>
                <button id="btn-submit" className='button button-block button-positive'>Submit</button>
              </form>
              {this.renderDeleteButton()}
           </div>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
      </div> 
    );
  }
})
