Ideas = React.createClass({

  getInitialState() {
    return {show: false};
  },

  submitIdea() {
    this.hideModal();
    var event_name = ReactDOM.findDOMNode(this.refs.idea_name).value;
    var event_desc = ReactDOM.findDOMNode(this.refs.idea_desc).value;
    var event_url = ReactDOM.findDOMNode(this.refs.url).value;
    var event_date = ReactDOM.findDOMNode(this.refs.idea_date).value;
    var cost = Math.ceil(ReactDOM.findDOMNode(this.refs.cost).value)
    // console.log(this.props)
    Trips.update({_id: this.props.trip._id}, {$push: {"ideas": {
      name: event_name,
      desc: event_desc,
      url: event_url,
      date: event_date,
      upvotes: 0,
      created_by: Meteor.userId(),
      cost: cost
    }}}, function (error) {
      if (error) {
        console.log(error)
      } else {
        console.log('no error')
      }
    })

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
            <ReactBootstrap.Modal.Title id="contained-modal-title-lg">New Idea</ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
            <div className="list">
              <label className="item item-input item-stacked-label">
                <span className="input-label">Event Name</span>
                <input type="text" ref="idea_name" placeholder="example"/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="input-label">Description</span>
                <input type="text" ref="idea_desc" placeholder="optional"/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="input-label">URL</span>
                <input type="text" ref="url" placeholder="example"/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="input-label">Date</span>
                <input type="date" ref='idea_date' placeholder="example"/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="input-label">Est. Group Cost</span>
                <input type="number" ref="cost" placeholder="$"/>
              </label>
            </div>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer>
            <ReactBootstrap.Button onClick={this.submitIdea}>Submit</ReactBootstrap.Button>
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



