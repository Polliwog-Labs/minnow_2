RemoveTrip = React.createClass({
  getInitialState(){
    return {show:false};
  },
  showModal(){
    this.setState({show:true});
  },
  hideModal(){
    this.setState({show:false});
  },
  removeTrip(){
    Trips.update({_id:this.props.trip._id},{
      $pull: {'members':Meteor.userId()}
    });
    $('.close').click();
  },
  render(){
    return (
      <div className='deletebutton'>
        <ReactBootstrap.Modal
            show={this.state.show}
            onHide={this.hideModal}
            dialogClassName="custom-modal">
            <ReactBootstrap.Modal.Body>
              <div className='col' >
                <h4>Are you sure you want to leave {this.props.trip.name}?</h4>
                <p>If you wish to rejoin this trip, another member will have to invite you again.</p>
              </div>
            </ReactBootstrap.Modal.Body>
            <ReactBootstrap.Modal.Footer>
              <ReactBootstrap.Button onClick={this.removeTrip}>Leave Trip</ReactBootstrap.Button>
              <ReactBootstrap.Button onClick={this.hideModal}>Cancel</ReactBootstrap.Button>
            </ReactBootstrap.Modal.Footer>
          </ReactBootstrap.Modal>
          <a onClick={this.showModal}>
            <div className="trip-remove">
             <i className="ion-close ice-text delete-trip-button"></i>
             <span className='icon-label'></span>
            </div>
          </a>
      </div>
    );
  }
});