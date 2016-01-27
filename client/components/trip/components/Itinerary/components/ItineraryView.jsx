ItineraryView = React.createClass({
  
  getInitialState: function () {
    return {
      showMap: false
    }
  },

  toggleMap: function () {
    this.setState({
      showMap: ! this.state.showMap
    })
  },

  render: function () {

    return (
      <div>
        <div className='row add-idea'>
          <div className='col'>
            <a onClick={ this.showModal }>
              <i className="icon ion-ios-plus-outline"></i>
              <span className='icon-label'>Add Event</span>
            </a>
          </div>
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
        </div>
        {
          this.state.showMap ?
            <div className='col'>
              <EventMap />
            </div> : ''
        }
        <div className='col'>
          <ItineraryLoader trip={this.props.trip} itinerary={this.props.trip.itinerary}/>
        </div>
      </div>
    )
  }
})
