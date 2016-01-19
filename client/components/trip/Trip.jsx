Trip = React.createClass({

  renderHome: function () {
    ReactDOM.render(<TripHome/>, document.getElementById('trip-module'))
  },

  renderItinerary: function () {
    ReactDOM.render(<Itinerary/>, document.getElementById('trip-module'))
  },

	render: function(){
    return (
      <div>
        <div className="tabs tabs-icon-top">
          <a className="tab-item" onClick={this.renderHome}>
            <i className="icon ion-home"></i>
            Home
          </a>
          <a className="tab-item" onClick={this.renderItinerary}>
            <i className="icon ion-ios-list-outline"></i>
            Itinerary
          </a>
          <a className="tab-item">
            <i className="icon ion-chatboxes"></i>
            Chat
          </a>
          <a className="tab-item">
            <i className="icon ion-cash"></i>
            Expenses
          </a>
          <a className="tab-item">
            <i className="icon ion-gear-a"></i>
            Settings
          </a>
        </div>
        <div id="trip-module"></div>
      </div>  
    )
  }
})