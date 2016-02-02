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
    var utc = DateUtils.dateConvert(ReactDOM.findDOMNode(this.refs.date).value, hour + ':' + min + amPm)
    var unixTime = new Date(utc).getTime();
    var dateTime = {
      date: ReactDOM.findDOMNode(this.refs.date).value,
      time: hour + ':' + min + amPm,
      utc: utc,
      unixTime: unixTime
    }
    Meteor.call('addIdeaToItin', this.props.trip._id, this.props.idea, dateTime, err=> {
      if (error) {
        console.log('failed to add to itinerary: ', error)
      } else {
        this.props.updateView('IdeasView')
        this.props.updateParent('Itinerary')
      }
    })
  },

  deleteIdea() {
    Meteor.call('deleteIdea', this.props.trip._id, this.props.idea.created_at, err=> {
      if (error) {
        console.log('failed delete idea: ', error)
      } else {
        this.props.updateView('IdeasView')
        this.props.updateParent('Itinerary')
      }
    })
  },

  upvote() {
    Meteor.call('ideaUpVote', this.props.trip._id, this.props.idea.created_at, err=> {
      if (error) {
        console.log('failed to upvote: ', error)
      } else {
        this.props.updateView('IdeasView')
        this.props.updateParent('Itinerary')
      }
    })
  },

  downVote() {
    Meteor.call('ideaDownVote', this.props.trip._id, this.props.idea.created_at, err=> {
      if (error) {
        console.log('failed to downvote: ', error)
      } else {
        this.props.updateView('IdeasView')
        this.props.updateParent('Itinerary')
      }
    })
  },

  navToLink() {
    window.open(this.props.idea.og.url, '_system')
  },

        // <a  href={this.props.idea.og.url}  target="_system"><h3 className='event-link'>{this.props.idea.og.title}</h3></a>          
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
        </div>
      </div>
    )
  }
})
