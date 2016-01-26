ItineraryView = React.createClass({
  render: function () {

    return (
      <div className='col'>
        <ItineraryLoader trip={this.props.trip} itinerary={this.props.trip.itinerary}/>
      </div>
    )
  }
})
