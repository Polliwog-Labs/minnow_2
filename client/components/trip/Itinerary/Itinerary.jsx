Itinerary = React.createClass({

  getInitialState: function () {
    return { 
      module: null
    }
  },

  updateModule(view) {
    this.setState({
      module: view
    })
  },

  componentDidUpdate(){
    switch (this.state.module){
      case 'IdeasView':
        this.renderIdeas();
        break;
      default:
        this.renderItinerary();
    }
  },

  componentWillMount() {
    this.props.updateParent('Itinerary');
  },

  componentDidMount: function () { //renders Itinerary view by default
    this.renderItinerary();
  },

  renderItinerary: function() {  //Toggles to Itinerary view
    $('#idea-toggle').removeClass('active');
    $('#itin-toggle').addClass('active');
    ReactDOM.render(<ItineraryView updateParent={this.props.updateParent} updateView={this.updateModule} trip={this.props.trip}/>, document.getElementById('itinerary-module'))
  },

  renderIdeas: function() {  // Toggles to Ideas View
    $('#itin-toggle').removeClass('active');
    $('#idea-toggle').addClass('active');
    ReactDOM.render(<Ideas updateParent={this.props.updateParent} updateView={this.updateModule} trip={this.props.trip}/>, document.getElementById('itinerary-module'))
  },

  render: function () {
    return (
      <div>
        <div className="segmented-control row">
          <div className='col seg-item control-item' id="itin-toggle" onClick={this.renderItinerary}>
            Itinerary
          </div>
          <div className='col seg-item control-item' id="idea-toggle" onClick={this.renderIdeas}>
            Ideas
          </div>
        </div>
        <div id="itinerary-module"></div>
      </div>
    )
  }
})
