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

    HTTP.call('GET', 'http://opengraph.io/api/1.0/site/' + event_url, (error, response)=> {
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
        Meteor.call('addEvent', this.props.trip._id, event, (error) => {
          if (error) {
            console.log(error)
          } else {
            this.props.updateView('ItineraryView')
            this.props.updateParent('Itinerary')
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
              this.props.trip && _.contains(this.props.trip.organizers, Meteor.userId()) ?
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
            <ReactBootstrap.Modal.Title id="contained-modal-title-lg">New Interary Event</ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
            <div className="list">
              <label className="item item-input item-stacked-label">
                <span className="dark-blue-text input-label">Event Name</span>
                <input type="text" ref="idea_name" placeholder="example"/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="dark-blue-text input-label">Description</span>
                <input type="text" ref="idea_desc" placeholder="optional"/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="dark-blue-text input-label">Location</span>
                <input type="text" ref="idea_location" placeholder=""/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="dark-blue-text input-label">URL</span>
                <input type="text" ref="url" placeholder="example"/>
              </label>
              <label className="item item-input item-stacked-label">
                <span className="dark-blue-text input-label">Est. Group Cost</span>
                <input type="number" ref="cost" placeholder="$"/>
              </label>
              <div className="row item bg-ice" > 
                <div className="col" >
                  <label className="item item-input item-select bg-ice">
                    <div className="dark-blue-text input-label">
                      Date
                    </div>
                    <input className="dark-blue-text item-input" id="newTrip-name" type="date" ref="date"/> 
                  </label>
                </div>
              </div>
              <div className="row item bg-ice" > 
                <div className="col bg-ice" >
                  <label className="item item-input bg-ice item-select">
                    <div className="dark-blue-text input-label bg-ice">
                      Hour
                    </div>
                    <select className="dark-blue-text bg-ice" defaultValue='12' ref='hour'>
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
                <div className="dark-blue-text col bg-ice" >
                  <label className="item item-input bg-ice item-select">
                    <div className="dark-blue-text input-label bg-ice">
                      Min
                    </div>
                    <select className="dark-blue-text bg-ice" defaultValue='00' ref="min">
                      <option>00</option>
                      <option>15</option>
                      <option>30</option>
                      <option>45</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="dark-blue-text row item bg-ice" > 
                <div className="dark-blue-text col bg-ice" >
                  <label className="item item-input bg-ice item-select">
                    <div className="dark-blue-text input-label bg-ice">
                      AM/PM
                    </div>
                    <select className="dark-blue-text bg-ice" defaultValue="AM" ref='am_pm'>
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
          <ItineraryLoader updateParent={this.props.updateParent} updateView={this.props.updateView} trip={this.props.trip} />
        </div>
      </div>
    )
  }
})
