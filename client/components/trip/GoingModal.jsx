GoingModal = React.createClass({
  
  renderMembers() {
    return this.props.members.map(function(member, index) {
      return (
        <a key={index} className="item item-avatar" href="">
          <Image ionicClass='avatar-image' image_id={member.profile.imageId} height="80px" profile={true}/>
          <p>{member.username}</p>
        </a>
      )
    })
  },  

  render () {
    return (

      <ReactBootstrap.Modal
        {...this.props}
        onHide={this.props.onHide}
        dialogClassName="custom-modal">
        <ReactBootstrap.Modal.Header closeButton>
          <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Who's going... </ReactBootstrap.Modal.Title>
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
          <div className="list">
            {this.renderMembers()}
          </div>
        </ReactBootstrap.Modal.Body>
      </ReactBootstrap.Modal>
    )
  }

})