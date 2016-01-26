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
    var hour = ReactDOM.findDOMNode(this.refs.hour).value;
    var min = ReactDOM.findDOMNode(this.refs.min).value;
    var amPm = ReactDOM.findDOMNode(this.refs.am_pm).value;
    var dateTime = {
      date: ReactDOM.findDOMNode(this.refs.date).value,
      time: hour + ':' + min + amPm
    }
    Meteor.call('addIdeaToItin', this.props.trip._id, this.props.idea, dateTime)
  },

  deleteIdea() {
    Meteor.call('deleteIdea', this.props.trip._id, this.props.idea.created_at)
  },

  upvote() {
    Meteor.call('ideaUpVote', this.props.trip._id, this.props.idea.created_at)
  },

  downVote() {
    Meteor.call('ideaDownVote', this.props.trip._id, this.props.idea.created_at)
  },

  render() {
    this.props.idea.og = this.props.idea.og || {image:'/doge.jpg',title:'foo',description:'bar'}
    return (
      <div className="item item-thumbnail-left ">
          <img src={this.props.idea.og.image}/>
          <h2>{this.props.idea.name}</h2>
          <p>{this.props.idea.desc}</p>
          <h3 className='event-link'>{this.props.idea.og.title}</h3>          
          <p>{this.props.idea.og.description}</p>
          <div className='row'>
            <div className="col-xs-1" onClick={ this.upvote } >
              <i className="icon ion-chevron-up"></i>
            </div>
            <div className='col-xs-2'>
              <p>{this.props.idea.upvotes}</p>
            </div>
            <div className='col-xs-1' onClick={ this.downVote } >
              <i className="icon ion-chevron-down"></i>
            </div>
            <div className='col-xs-6'></div>
            {  _.contains(this.props.trip.organizers, Meteor.userId()) ?
                <div className='col-xs-2' onClick={ this.showModal }>
                  <i className="icon ion-ios-plus-empty"></i>
                  <i className="icon ion-ios-list-outline idea-delete"></i>
                </div> : ''
            }  
            {
              Meteor.user().username === this.props.created_by || 
                _.contains(this.props.trip.organizers, Meteor.userId()) ?
                  <div className='col-xs-2' onClick={ this.deleteIdea } >
                    <i className="icon ion-trash-b"></i>
                    <ReactBootstrap.Modal {...this.props} bsSize="small" show={this.state.showModal} onHide={this.hideModal} aria-labelledby="contained-modal-title-sm">
                      <ReactBootstrap.Modal.Header closeButton>
                        <ReactBootstrap.Modal.Title id="contained-modal-title-sm">Date & Time</ReactBootstrap.Modal.Title>
                      </ReactBootstrap.Modal.Header>
                      <ReactBootstrap.Modal.Body>
                        <div className="list">
                          <div className="row item" > 
                            <div className="col" >
                              <label className="item item-input item-select">
                                <div className="input-label">
                                  Date
                                </div>
                                <input className="item-input" id="newTrip-name" type="date" ref="date"/> 
                              </label>
                            </div>
                          </div>
                          <div className="row item" > 
                            <div className="col" >
                              <label className="item item-input item-select">
                                <div className="input-label">
                                  Hour
                                </div>
                                <select defaultValue='12' ref='hour'>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                </select>
                              </label>
                            </div>
                            <div className="col" >
                              <label className="item item-input item-select">
                                <div className="input-label">
                                  Min
                                </div>
                                <select defaultValue='00' ref="min">
                                  <option>00</option>
                                  <option>15</option>
                                  <option>30</option>
                                  <option>45</option>
                                </select>
                              </label>
                            </div>
                          </div>
                          <div className="row item" > 
                            <div className="col" >
                              <label className="item item-input item-select">
                                <div className="input-label">
                                  AM/PM
                                </div>
                                <select defaultValue="AM" ref='am_pm'>
                                  <option>AM</option>
                                  <option>PM</option>
                                </select>
                              </label>
                            </div>
                          </div>
                        </div>
                      </ReactBootstrap.Modal.Body>
                      <ReactBootstrap.Modal.Footer>
                        <ReactBootstrap.Button onClick={this.addToItinerary}>Add to Itinerary</ReactBootstrap.Button>
                      </ReactBootstrap.Modal.Footer>
                    </ReactBootstrap.Modal>   
                  </div> : ''
            }
          </div>
      </div>
    )
  }
})
