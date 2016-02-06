DeclinedModal = React.createClass({
  
  renderDeclined() {
    if (this.props.declined){
      return this.props.declined.map(function (user, index) {
        return (
          <a key={index} className="item item-avatar" href="">
            { user.profile.image_id ?
              <Image ionicClass='avatar-image' image_id={user.imageId} height="80px" profile={true}/> :
              <img className="avatar-image" src='http://rlv.zcache.co.nz/ocean_sunset_with_palm_tree_round_sticker-r64bf665d3c4c4a799c7e9fc5c748b5c5_v9wth_8byvr_324.jpg' />
            }
            <p>{user.username}</p>
          </a>
        )
      })
    } else return <div/>;
  },  

  render () {
    return (

      <ReactBootstrap.Modal
        {...this.props}
        onHide={this.props.onHide}
        dialogClassName="custom-modal">
        <ReactBootstrap.Modal.Header closeButton>
          <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Who's missing out... </ReactBootstrap.Modal.Title>
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
          <div className="list">
            {this.renderDeclined()}
          </div>
        </ReactBootstrap.Modal.Body>
      </ReactBootstrap.Modal>
    )
  }

})