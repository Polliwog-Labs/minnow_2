Ideas = React.createClass({

  getInitialState() {
    return {show: false};
  },

  showModal() {
    this.setState({show: true});
  },

  hideModal() {
    this.setState({show: false});
  },


  render: function () {

    return (
      <div>
        <ReactBootstrap.Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
        >
          <ReactBootstrap.Modal.Header closeButton>
            <ReactBootstrap.Modal.Title id="contained-modal-title-lg">Add a new idea!</ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
            <AddIdeaModal />
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer>
            <ReactBootstrap.Button onClick={this.hideModal}>Close</ReactBootstrap.Button>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal>
        <div className="row add-idea">
          <div className='col'>
            <a onClick={ this.showModal }>
              <i className="icon ion-plus-circled"></i>
              <span className='icon-label'>Add Idea</span>
            </a>
          </div>
          <div className='col'></div>
        </div>
        <div className="list">
          <a className="item item-thumbnail-left" href="#">
            <img src="cover.jpg"/>
            <h2>Suck My Balls</h2>
            <p>Ninny Fannyweather</p>
          </a>
          <a className="item item-thumbnail-left" href="#">
            <img src="cover.jpg"/>
            <h2>Pretty Hate Machine</h2>
            <p>Nine Inch Nails</p>
          </a>
        </div>
      </div>
    )
  }
})