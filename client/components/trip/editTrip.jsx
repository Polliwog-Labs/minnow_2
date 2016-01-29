EditTrip = React.createClass({
  propTypes: {
    trip: React.PropTypes.object
  },
  getInitialState: function(){
    return {//image_id:null, 
      hide:false};
  },
  getHelperObj(image_id){
    var helperObj = {dates:[]};
    if (image_id) helperObj.image_id = image_id;
    var name = ReactDOM.findDOMNode(this.refs.newTrip_name).value;
    if (name) helperObj.name = name;
    var startDate = new Date(ReactDOM.findDOMNode(this.refs.newTrip_startDate).value).getTime();
    if (startDate && startDate !== NaN) helperObj.dates.push(startDate);
    var endDate = new Date(ReactDOM.findDOMNode(this.refs.newTrip_endDate).value).getTime();
    if (helperObj.dates[0] && endDate && endDate !== NaN) helperObj.dates.push(endDate);
    if (!helperObj.dates.length) delete helperObj.dates;
    return helperObj;
  },

  submitTrip: function(event){
    event.preventDefault();
    var file = $('#newTrip-file')[0].files[0] || ReactDOM.findDOMNode(this.refs.newTrip_url).value || {};
    console.log(file.constructor)
    if (typeof file === 'string'){
      Meteor.call('storeImage',file,(err,data)=>{
        if (err) console.log(err)
        else {
          Trips.update({_id:this.props.trip._id},{$set:this.getHelperObj(data._id)});
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
                  <span>{this.props.trip ? this.props.trip.name : 'Enter a Name'}</span>
                  <input id="newTrip-name" type="text" ref="newTrip_name" placeholder="Trip Name"/>
                </label>
                <div className="row item">
                  <div className='col-50'>
                    <label className="item-stacked-label">
                      <span>Start Date</span>
                      <input className="item-input" type="date" ref="newTrip_startDate" 
                        defaultValue={(this.props.trip && this.props.trip.dates && this.props.trip.dates[0]) ? DateUtils.getHTMLDate(this.props.trip.dates[0]) : null}/>
                    </label>
                  </div>
                  <div className='col-50'>
                    <label className="item-stacked-label">
                      <span>End Date</span>
                      <input className="item-input" type="date" ref="newTrip_endDate" 
                        defaultValue={(this.props.trip && this.props.trip.dates && this.props.trip.dates[0]) ? DateUtils.getHTMLDate(this.props.trip.dates[1]) : null}/>
                    </label> 
                  </div>
                </div>
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
              <p><a href='/mytrips'>My Trips</a></p>
              <div className='image-div'>
                <Image image_id={this.state.image_id || this.props.trip ? this.props.trip.image_id : null} height="100%" />
              </div>
           </div>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
      </div>
       
    );
  }
})
