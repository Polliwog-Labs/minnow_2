ItineraryLoader = React.createClass({
  itineraryList(){
    var trip = this.props.trip;
    return this.props.itinerary.map((event, index)=>{
       return <ItineraryEvent updateParent={this.props.updateParent} updateView={this.props.updateView} trip={trip} key={index} event={event}/>
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