IdeaEvent = React.createClass({ 

  addToItinerary() {
    Meteor.call('addIdeaToItin', this.props.trip._id, this.props.idea)
  },

  deleteIdea() {
    Meteor.call('deleteIdea', this.props.trip._id, this.props.idea.name)
  },

  render() {
    return (
      <div className="item item-thumbnail-left ">
          <img src={this.props.idea.og.image}/>
          <h2>{this.props.idea.name}</h2>
          <p>{this.props.idea.desc}</p>
          <h3 className='event-link'>{this.props.idea.og.title}</h3>          
          <p>{this.props.idea.og.description}</p>
          <div className='row'>
            <div className="col-xs-1">
              <i className="icon ion-thumbsup"></i>
            </div>
            <div className='col-xs-1'>
              <i className="icon ion-thumbsdown"></i>
            </div>
            <div className='col-xs-2'>
              <p>{this.props.idea.upvotes}</p>
            </div>
            <div className='col-xs-6'></div>
            {  _.contains(this.props.trip.organizers, Meteor.userId()) ?
                <div className='col-xs-2' onClick={ this.addToItinerary }>
                  <i className="icon ion-ios-plus-empty"></i>
                  <i className="icon ion-ios-list-outline"></i>
                </div> : ''
            }  
            {
              Meteor.user().username === this.props.created_by || 
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