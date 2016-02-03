ItineraryLoader = React.createClass({
  itineraryList(){
    if (this.props.trip){
      var trip = this.props.trip;
      return trip.itinerary.map((event, index)=>{
         return <ItineraryEvent updateParent={this.props.updateParent} updateView={this.props.updateView} trip={trip} key={index} event={event}/>
      }).sort(function(a, b) {
        return a.props.event.unixTime - b.props.event.unixTime;
      })
    } else return <div/>;
  },

  render() {
    return (
      <div className="list"> 
        {this.itineraryList()}
      </div>
    )
  }
})