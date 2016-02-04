GoingModal = React.createClass({

  // getInitialState() {
  //   return {
  //     show: false
  //   }
  // },
  
  renderMembers() {
    return this.props.members.map(function(member) {
      return (
        <a className="item item-avatar" href="">
          <Image ionicClass='avatar-image' image_id={member.profile.imageId} height="80px" profile={true}/>
          <h2>{member.username}</h2>
        </a>
      )
    })
  },  

  render () {
        // show={this.state.show}
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