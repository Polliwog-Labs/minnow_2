Ideas = React.createClass({

  getInitialState() {
    return {show: false};
  },

  submitIdea() {
    this.hideModal();
    var event_name = ReactDOM.findDOMNode(this.refs.idea_name).value;
    var event_desc = ReactDOM.findDOMNode(this.refs.idea_desc).value;
    var event_url = encodeURIComponent(ReactDOM.findDOMNode(this.refs.url).value);
    var cost = Math.ceil(ReactDOM.findDOMNode(this.refs.cost).value);
    var event_location = ReactDOM.findDOMNode(this.refs.idea_location).value;
    var trip = this.props.trip._id;
    var created_at = String(new Date())
    HTTP.call('GET', 'http://opengraph.io/api/1.0/site/' + event_url, (error, response)=>{
      if (error) {
        console.log('API call error - no URL data saved:', error)
      } else {
        var og = JSON.parse(response.content).hybridGraph;
        var event = {
          trip_id: trip,
          name: event_name,
          desc: event_desc,
          og: og,
          created_by: Meteor.user().username,
          created_at: created_at,
          cost: cost,
          location: event_location
        }

        Meteor.call('addIdea', event, (error) => {
          if (error) {
            console.log(error)
          } else {
            // this.props.updateView('IdeasView')
            // this.props.updateParent('Itinerary')
          }
        })
      }
    })
  },

  showModal() {
    this.setState({show: true});
  },

  hideModal() {
    this.setState({show: false});
  },
  componentWillMount() {
    this.props.updateView('IdeasView');
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
                <span className="dark-blue-text input-label">Event Name</span>
                <input type="text" ref="idea_name" placeholder=""/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="dark-blue-text input-label">Description</span>
                <input type="text" ref="idea_desc" placeholder=""/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="dark-blue-text input-label">Location</span>
                <input type="text" ref="idea_location" placeholder=""/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="dark-blue-text input-label">URL</span>
                <input type="text" ref="url" placeholder=""/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="dark-blue-text input-label">Est. Group Cost</span>
                <input type="number" ref="cost" placeholder="$"/>
              </label>
            </div>
            <button className="button button-block button-positive" onClick={this.submitIdea}>Submit
              Block Button
            </button>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
        <div className="row add-idea">
          <div className='col'>
            <a onClick={ this.showModal }>
              <i className="icon ion-ios-plus-outline"></i>
              <span className='icon-label'>Add Idea</span>
            </a>
          </div>
          <div className='col'></div>
        </div>
        <div >
          <IdeaLoader trip={this.props.trip} updateParent={this.props.updateParent} updateView={this.props.updateView} ideas={this.props.trip.ideas || [] }/>
        </div>
      </div>

    )
  }
})



