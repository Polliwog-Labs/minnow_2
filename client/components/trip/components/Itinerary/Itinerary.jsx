Itinerary = React.createClass({

  getInitialState: function () {
    return {}
  },

  componentDidMount: function () {
    this.renderItinerary()
  },

  renderItinerary: function() {
    $('#idea-toggle').removeClass('active');
    $('#itin-toggle').addClass('active');
    ReactDOM.render(<ItineraryView trip={this.props.trip}/>, document.getElementById('itinerary-module'))
  },

  renderIdeas: function() {
    $('#itin-toggle').removeClass('active');
    $('#idea-toggle').addClass('active');
    ReactDOM.render(<Ideas trip={this.props.trip}/>, document.getElementById('itinerary-module'))
  },

  render: function () {
    return (
      <div>
        <div className="segmented-control col">
          <a id="itin-toggle" className="control-item" onClick={this.renderItinerary} >
            Itinerary
          </a>
          <a id="idea-toggle" className="control-item" onClick={this.renderIdeas} >
            Ideas
          </a>
        </div>
        <div id="itinerary-module"></div>
      </div>
    )
  }
})