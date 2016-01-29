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
              <ReactBootstrap.Modal.Header closeButton>
                <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Confirm Remove</ReactBootstrap.Modal.Title>
              </ReactBootstrap.Modal.Header>
              <ReactBootstrap.Modal.Body>
              <h1>Really Leave This Trip?</h1>
              <p>If you wish to rejoin this trip, another member will have to invite you again.</p>
              </ReactBootstrap.Modal.Body>
              <ReactBootstrap.Modal.Footer>
                <ReactBootstrap.Button onClick={this.removeTrip}>Remove Me From This Trip</ReactBootstrap.Button>
                <ReactBootstrap.Button onClick={this.hideModal}>Cancel</ReactBootstrap.Button>
              </ReactBootstrap.Modal.Footer>
            </ReactBootstrap.Modal>
        <button style={{
          'float':'right',
          'marginTop':'2px',
          'marginRight':'10px'}} className='button button-negative' onClick={this.showModal}>Remove Me From This Trip</button>
      </div>
    );
  }
});