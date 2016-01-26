ItineraryEvent = React.createClass({
  
  deleteEvent() {
    Meteor.call('deleteEvent', this.props.trip._id, this.props.event.created_at)
  },

  render() {
    return (
      <div className="item item-thumbnail-left event-list-item">
          <img src={this.props.event.og.image}/>*/}
          <h2>{this.props.event.name}</h2>
          <p>{this.props.event.desc}</p>
          <h3 className='event-link'>{this.props.event.og.title}</h3>          
          <p>{this.props.event.og.description}</p>
          <div className='row'>
            <div className='col-xs-2'>
              {this.props.event.upvotes}
            </div>
            <div className='col-xs-6'></div>
            {
              _.contains(this.props.trip.organizers, Meteor.userId()) ?
                <div className='col-xs-4 delete-event' onClick={ this.deleteEvent } >
                  <i className="icon ion-trash-b"></i>
                </div> : ''   
            }
          </div>
      </div>
    )
  }
})