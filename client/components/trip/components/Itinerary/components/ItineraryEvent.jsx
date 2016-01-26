ItineraryEvent = React.createClass({
  render() {
    return (
      <div className="item item-thumbnail-left ">
          <img src={this.props.event.og.image}/>*/}
          <h2>{this.props.event.name}</h2>
          <p>{this.props.event.desc}</p>
          <h3 className='event-link'>{this.props.event.og.title}</h3>          
          <p>{this.props.event.og.description}</p>
          <div className='row'>
            <div className="col-xs-1" onClick={ this.upvote } >
              <i className="icon ion-thumbsup"></i>
            </div>
            <div className='col-xs-1' onClick={ this.downVote } >
              <i className="icon ion-thumbsdown"></i>
            </div>
            <div className='col-xs-2'>
              <p>{this.props.event.upvotes}</p>
            </div>
            <div className='col-xs-6'></div>
            {
              _.contains(this.props.trip.organizers, Meteor.userId()) ?
                <div className='col-xs-2' onClick={ this.deleteIdea } >
                  <i className="icon ion-trash-b"></i>
                </div> : ''   
            }
          </div>
      </div>
    )
  }
})