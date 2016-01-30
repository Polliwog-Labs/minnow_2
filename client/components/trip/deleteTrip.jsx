DeleteTrip = React.createClass({
  getInitialState(){
    return {show:false};
  },
  showModal(){
    this.setState({show:true});
  },
  hideModal(){
    this.setState({show:false});
  },
  deleteTrip(){
    Trips.remove({_id:this.props.trip._id});
    $('.close').click();
    window.location.href='/mytrips';
  },
  render(){
    if (this.props.trip.organizers.includes(Meteor.userId())) return (
      <div className='deletebutton'>
          <ReactBootstrap.Modal
              show={this.state.show}
              onHide={this.hideModal}
              dialogClassName="custom-modal">
              <ReactBootstrap.Modal.Header closeButton>
                <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Confirm Delete</ReactBootstrap.Modal.Title>
              </ReactBootstrap.Modal.Header>
              <ReactBootstrap.Modal.Body>
              <h1>Really Delete Trip?</h1>
              </ReactBootstrap.Modal.Body>
              <ReactBootstrap.Modal.Footer>
                <ReactBootstrap.Button onClick={this.deleteTrip}>Delete Trip</ReactBootstrap.Button>
                <ReactBootstrap.Button onClick={this.hideModal}>Cancel</ReactBootstrap.Button>
              </ReactBootstrap.Modal.Footer>
            </ReactBootstrap.Modal>
        <button className='button button-block button-negative' onClick={this.showModal}>Delete Trip</button>
      </div>
    );
  } else return <div/>
});