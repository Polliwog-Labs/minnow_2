Trip = React.createClass({

  getInitialState: function () {
    return {
      module: <TripHome/>
    }
  },

  renderHome: function () {
    $('.active').removeClass('active');
    $('#home').addClass('active');
    // return <TripHome/>
    this.setState({
      module: <TripHome/>
    })
    // ReactDOM.render(<TripHome/>, document.getElementById('trip-module'))
  },

  renderItinerary: function () {
    $('.active').removeClass('active');
    $('#itinerary').addClass('active');
    this.setState({
      module: <Itinerary/>
    })
    // ReactDOM.render(<Itinerary/>, document.getElementById('trip-module'))
  },

  renderChat: function () {
    $('.active').removeClass('active');
    $('#chat').addClass('active');
    // this.setState({
    //   module: 
    // })
  },

  renderSettings: function () {
    $('.active').removeClass('active');
    $('#settings').addClass('active');
    // this.setState({
    //   module: 
    // })
  },

  renderExpenses: function () {
    $('.active').removeClass('active');
    $('#cash').addClass('active');
  },

	render: function(){
    console.log('Trip - this.props: ', this.props)
    return (
      <div>
        <div className="tabs tabs-icon-top">
          <a className="tab-item active" id='home'onClick={this.renderHome}>
            <i className="icon ion-home"></i>
            Home
          </a>
          <a className="tab-item" id='itinerary' onClick={this.renderItinerary}>
            <i className="icon ion-ios-list-outline"></i>
            Itinerary
          </a>
          <a className="tab-item" id="chat" onClick={this.renderChat}>
            <i className="icon ion-chatboxes"></i>
            Chat
          </a>
          <a className="tab-item" id='cash' onClick={this.renderExpenses}>
            <i className="icon ion-cash expenses"></i>
            Expenses
          </a>
          <a className="tab-item" id='settings' onClick={this.renderSettings}>
            <i className="icon ion-gear-a settings"></i>
            Settings
          </a>
        </div>
        <div >{this.state.module}</div>
      </div>  
    )
  }
})