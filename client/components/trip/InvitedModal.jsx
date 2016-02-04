InvitedModal = React.createClass({
  
  renderInvites() {
    return this.props.invites.map(function(invite, index) {
      return (
        <a key={index} className="item item-avatar" href="">
          <img className="avatar-image" src='http://rlv.zcache.co.nz/ocean_sunset_with_palm_tree_round_sticker-r64bf665d3c4c4a799c7e9fc5c748b5c5_v9wth_8byvr_324.jpg' />
          <p>{invite}</p>
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
          <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Pending invites... </ReactBootstrap.Modal.Title>
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
          <div className="list">
            {this.renderInvites()}
          </div>
        </ReactBootstrap.Modal.Body>
      </ReactBootstrap.Modal>
    )
  }

})