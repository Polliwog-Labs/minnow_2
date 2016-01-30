AddOrganizer = React.createClass({

  getInitialState(){
    return {show:false,organizers:this.props.trip ? this.props.trip.organizers : []}
  },
  showModal(){
    this.setState({show:true});
  },
  hideModal(){
    this.setState({show:false});
  },
  populateMembers(){
    if (this.props.members.length > 1){
      return this.props.members.filter(user=>{return Meteor.userId() !== user._id}).map((user,index)=>{
        var id = Meteor.userId();
        user.toggled = this.state.organizers.includes(user._id);
        return (
          <li ref="split_with" className="item item-toggle" key={index}>
            {user.username}
            <label className="toggle toggle-balanced">
              <input id={index} type="checkbox" value={user._id} onClick={this.onToggle} defaultChecked={user.toggled} />
                <div className="track">
                  <div className="handle" />
                </div>
            </label>
          </li>
        );
      });    
    } else return <li>Invite some friends first!</li>;
  },
  onToggle(event){
    var newOrganizers = this.state.organizers.slice();
    var targetId = event.target.value;
    var targetIndex = newOrganizers.indexOf(targetId);
    if (newOrganizers.includes(targetId)){
      newOrganizers.splice(targetIndex,1);
    } else {
      newOrganizers.push(targetId);
    }
    this.setState({organizers:newOrganizers})
  },
  addOrganizers(){
    this.props.update(this.state.organizers);
    this.hideModal();
  },
  render(){
      return (
      <label className="item item-input item-stacked-label">
        <ReactBootstrap.Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal">
          <ReactBootstrap.Modal.Header closeButton>
            <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Organizer?</ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
          <ul className="list">
            {this.populateMembers()}
          </ul>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer>
            <ReactBootstrap.Button onClick={this.addOrganizers}>Add Organizers</ReactBootstrap.Button>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal>
        <div className="row add-organizers">
          <div className='col'>
            <a onClick={this.showModal}>
              <i className="icon ion-plus-circled"></i>
              <span className='icon-label'>Add Organizers</span>
            </a>
          </div>
          <div className='col'></div>
        </div>
      </label>
    )
   
  }
});