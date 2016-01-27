Ideas = React.createClass({

  getInitialState() {
    return {show: false};
  },

  // getIdeas() {
  //   Meteor.call('')
  // },

  submitIdea() {
    this.hideModal();
    var event_name = ReactDOM.findDOMNode(this.refs.idea_name).value;
    var event_desc = ReactDOM.findDOMNode(this.refs.idea_desc).value;
    var event_url = encodeURIComponent(ReactDOM.findDOMNode(this.refs.url).value);
    var event_date = ReactDOM.findDOMNode(this.refs.idea_date).value;
    var cost = Math.ceil(ReactDOM.findDOMNode(this.refs.cost).value);
    var event_location = ReactDOM.findDOMNode(this.refs.idea_location).value;
    var trip = this.props.trip._id;
    var created_at = String(new Date())
    console.log('date: ', created_at)
    HTTP.call('GET', 'http://opengraph.io/api/1.0/site/' + event_url, function(error, response) {
      if (error) {
        console.log('API call error - no URL data saved:', error)
      } else {
        console.log('og: ', JSON.parse(response.content).hybridGraph)
        var og = JSON.parse(response.content).hybridGraph;
        console.log(og);
        var event = {
          trip_id: trip,
          name: event_name,
          desc: event_desc,
          og: og,
          date: event_date,
          created_by: Meteor.user().username,
          created_at: created_at,
          cost: cost,
          location: event_location
        }

        Meteor.call('addIdea', event, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log('working')
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


  render: function () {
    console.log('ideas props', this.props)
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
                <span className="input-label">Location</span>
                <input type="text" ref="idea_location" placeholder=""/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="input-label">URL</span>
                <input type="text" ref="url" placeholder="example"/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="input-label">Est. Group Cost</span>
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
          <IdeaLoader trip={this.props.trip} ideas={this.props.trip.ideas || [] }/>
        </div>
      </div>

    )
  }
})



