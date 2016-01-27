ItineraryEvent = React.createClass({
  
  displayTime() {
    return this.props.event.utc.toLocaleString().replace(':00 ', ' ').replace('at', ' ')
  },

  deleteEvent() {
    Meteor.call('deleteEvent', this.props.trip._id, this.props.event.created_at)
  },

  render() {
    console.log(this.props)
    this.props.event.og = this.props.event.og || {image:"http://static1.squarespace.com/static/5542dcefe4b0f37cdc4d6e60/5542e8dae4b0b79fc2fc8dfd/5542e9a0e4b0b79fc2fc9a9e/1430448712022/Virginia-Group-Travel1.jpeg",
    title:'',description:''}
    return (
      <div className="item item-thumbnail-left event-list-item">
          <img src={this.props.event.og.image}/>
          <h2>{this.displayTime().toString()} </h2>
          <h3>{this.props.event.name}</h3>
          <p>{this.props.event.desc}</p>
          <h4 className='event-link'>{this.props.event.og.title}</h4>          
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