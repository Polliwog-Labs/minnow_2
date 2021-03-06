IdeaEvent = React.createClass({ 
  getInitialState() {
      return { showModal: false };
  },
  
  showModal() {
    this.setState({showModal: true});
  },

  hideModal() {
    this.setState({showModal: false});
  },

  addToItinerary() {
    this.hideModal();
    var hour = undefined;
    var min = undefined;
    var amPm = undefined;
    var utc = DateUtils.dateConvert(ReactDOM.findDOMNode(this.refs.date).value, ReactDOM.findDOMNode(this.refs.time).value)
    var unixTime = new Date(utc).getTime();
    var dateTime = {
      date: ReactDOM.findDOMNode(this.refs.date).value,
      time: hour + ':' + min + amPm,
      utc: utc,
      unixTime: unixTime
    }
    Meteor.call('addIdeaToItin', this.props.trip._id, this.props.idea, dateTime, err=> {
      if (err) {
        console.log('failed to add to itinerary: ', err)
      } 
    })
  },

  deleteIdea() {
    Meteor.call('deleteIdea', this.props.trip._id, this.props.idea.created_at, err => {
      if (err) {
        console.log('failed delete idea: ', err)
      } else {
        this.props.updateView('IdeasView')
        this.props.updateParent('Itinerary')
      }
    })
  },

  upvote() {
    Meteor.call('ideaUpVote', this.props.trip._id, this.props.idea.created_at, err => {
      if (err) {
        console.log('failed to upvote: ', err)
      } 
    })
  },

  downVote() {
    Meteor.call('ideaDownVote', this.props.trip._id, this.props.idea.created_at, err => {
      if (err) {
        console.log('failed to downvote: ', err)
      } 
    })
  },

  navToLink() { //opens link within app on mobile, in new tab on web
    window.open(this.props.idea.og.url, '_system');
  },

  render() {
    this.props.idea.og = this.props.idea.og || {image:"http://static1.squarespace.com/static/5542dcefe4b0f37cdc4d6e60/5542e8dae4b0b79fc2fc8dfd/5542e9a0e4b0b79fc2fc9a9e/1430448712022/Virginia-Group-Travel1.jpeg",
    title:'',description:''}
    return (
      <div className="item item-thumbnail-left event-list-item">
        <img src={this.props.idea.og.image}/>
        <h2>{this.props.idea.name}</h2>
        <p>{this.props.idea.desc}</p>
        <a  onClick={this.navToLink}><h3 className='event-link'>{this.props.idea.og.title}</h3></a>          

        <p>{this.props.idea.og.description}</p>
        <div className='row'>
          <div className="col-xs-1" onClick={ this.upvote } >
            <i className="icon ion-chevron-up"></i>
          </div>
          <div className='col-xs-1'>
            {this.props.idea.upvotes}
          </div>
          <div className='col-xs-2' onClick={ this.downVote } >
            <i className="icon ion-chevron-down"></i>
          </div>
          <div className='col-xs-1'></div>
          {  _.contains(this.props.trip.organizers, Meteor.userId()) ?
              <div className='col-xs-2' onClick={ this.showModal }>
                <i className="icon ion-arrow-right-a"></i>
                <i className="icon ion-ios-list-outline"></i>
              </div> : ''
          }  
          <div className='col-xs-6'></div>
          {
            Meteor.user().username === this.props.created_by || 
              _.contains(this.props.trip.organizers, Meteor.userId()) ?
                <div className='col-xs-2 delete-event' onClick={ this.deleteIdea } >
                  <i className="icon ion-trash-b"></i>
                </div> : ''
          }
          <ReactBootstrap.Modal {...this.props} bsSize="small" show={this.state.showModal} onHide={this.hideModal} backdrop='static' aria-labelledby="contained-modal-title-sm">
            <ReactBootstrap.Modal.Header closeButton>
              <ReactBootstrap.Modal.Title id="contained-modal-title-sm">Date & Time</ReactBootstrap.Modal.Title>
            </ReactBootstrap.Modal.Header>
            <ReactBootstrap.Modal.Body>
              <div className="list">
                <div className="row item" > 
                  <div className="col" >
                    <label className="item item-input item-select date-form">
                      <div className="input-label">
                        Date
                      </div>
                      <input className="item-input" id="newTrip-name" type="date" ref="date"/> 
                    </label>
                  </div>
                </div>
                <div className="row item" > 
                  <div className="col" >
                    <label className="item item-input item-select date-form">
                      <div className="input-label">
                        Time
                      </div>
                      <input className="item-input" id="newTrip-name" type="time" ref="time"/> 
                    </label>
                  </div>
                </div>
              </div>
            </ReactBootstrap.Modal.Body>
            <ReactBootstrap.Modal.Footer>
              <ReactBootstrap.Button onClick={this.addToItinerary}>Add to Itinerary</ReactBootstrap.Button>
            </ReactBootstrap.Modal.Footer>
          </ReactBootstrap.Modal>   
        </div>
      </div>
    )
  }
})
