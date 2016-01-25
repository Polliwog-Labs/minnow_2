ItineraryLoader = React.createClass({
  itineraryList(){
    var trip = this.props.trip;
    return this.props.itinerary.map(function (event, index) {
       return <ItineraryEvent trip={trip} key={index} event={event}/>
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