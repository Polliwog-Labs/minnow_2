ItineraryView = React.createClass({
  
  getInitialState: function () {
    return {
      showMap: false,
      show: false
    }
  },

  toggleMap: function () {
    this.setState({
      showMap: ! this.state.showMap
    })
  },

  showModal() {
    this.setState({show: true});
  },

  hideModal() {
    this.setState({show: false});
  },

  submitEvent() {
    this.hideModal();
    var that = this;
    var event_name = ReactDOM.findDOMNode(this.refs.idea_name).value;
    var event_desc = ReactDOM.findDOMNode(this.refs.idea_desc).value;
    var event_url = encodeURIComponent(ReactDOM.findDOMNode(this.refs.url).value);
    var cost = Math.ceil(ReactDOM.findDOMNode(this.refs.cost).value);
    var event_location = ReactDOM.findDOMNode(this.refs.idea_location).value;
    var trip = this.props.trip._id;
    var created_at = String(new Date())
    var hour = ReactDOM.findDOMNode(this.refs.hour).value;
    var min = ReactDOM.findDOMNode(this.refs.min).value;
    var amPm = ReactDOM.findDOMNode(this.refs.am_pm).value;
    var utc = DateUtils.dateConvert(ReactDOM.findDOMNode(this.refs.date).value, hour + ':' + min + amPm);
    var unixTime = new Date(utc).getTime();
    var date = ReactDOM.findDOMNode(this.refs.date).value;
    var time = hour + ':' + min + amPm;

    HTTP.call('GET', 'http://opengraph.io/api/1.0/site/' + event_url, function(error, response) {
      if (error) {
        console.log('API call error - no URL data saved:', error)
      } else {
        var og = JSON.parse(response.content).hybridGraph;
        var event = {
          // trip_id: trip,
          name: event_name,
          desc: event_desc,
          og: og,
          date: date,
          time: time,
          utc: utc,
          unixTime:unixTime,
          created_by: Meteor.user().username,
          created_at: created_at,
          cost: cost,
          location: event_location,
          upvotes: 0
        }
        Meteor.call('addEvent', that.props.trip._id, event, (error) => {
          if (error) {
            console.log(error)
          } else {
            that.props.updateView('ItineraryView')
            that.props.updateParent('Itinerary')
          }
        })
        // Meteor.call('addEvent', that.props.trip._id, event, (err,data)=>{
        //   !err && that.props.updateParent('Messages');
        // })
      }
    })
  },

  render: function () {

    return (
      <div>
        <div className='row add-idea'>
          <div className='col'>
            <a onClick={ this.toggleMap }>
              <i className="icon ion-map"></i>
              {
                this.state.showMap ?
                  <span className='icon-label'>Hide Map</span> :
                  <span className='icon-label'>Show Map</span>       
              }
            </a>
          </div>
          <div className='col'>
            {
              _.contains(this.props.trip.organizers, Meteor.userId()) ?
                <a onClick={ this.showModal }>
                  <i className="icon ion-ios-plus-outline"></i>
                  <span className='icon-label'>Add Event</span>
                </a> : ''
            }
          </div>
        </div>
        {
          this.state.showMap ?
            <div className='col'>
              <EventMap />
            </div> : ''
        }
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
            <button className="button button-block button-positive" onClick={this.submitEvent}>Submit
              Block Button
            </button>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
        <div className='col'>
          <ItineraryLoader updateParent={this.props.updateParent} updateView={this.props.updateView} trip={this.props.trip} itinerary={this.props.trip.itinerary}/>
        </div>
      </div>
    )
  }
})
