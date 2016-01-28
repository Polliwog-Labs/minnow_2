ItineraryLoader = React.createClass({
  itineraryList(){
    var trip = this.props.trip;
    var that = this
    return this.props.itinerary.map(function (event, index) {
       return <ItineraryEvent updateParent={that.props.updateParent} updateView={that.props.updateView} trip={trip} key={index} event={event}/>
    }).sort(function(a, b) {
      return a.props.event.unixTime - b.props.event.unixTime;
    })
  },

  render() {
    return (
      <div className="list"> 
        {this.itineraryList()}
      </div>
    )
  }
})