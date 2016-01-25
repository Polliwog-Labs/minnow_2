IdeaEvent = React.createClass({ 
  render() {
    return (
      <div className="item item-thumbnail-left ">
          <img src={this.props.og.image}/>
          <h2>{this.props.name}</h2>
          <p>{this.props.desc}</p>
          <h3 className='event-link'>{this.props.og.title}</h3>          
          <p>{this.props.og.description}</p>
          <div className='row'>
            <div className="col-md-1">
              <i className="icon ion-thumbsup"></i>
            </div>
            <div className='col-sm-1'>
              <i className="icon ion-thumbsdown"></i>
            </div>
            <div className='col-sm-2'>
              <p>{this.props.upvotes}</p>
            </div>
            {
              Meteor.user().username === this.props.created_by || 
                _.contains(this.props.trip.organizers, Meteor.userId()) ?
                  <div className='col-sm-2'>
                    <i className="icon ion-trash-b delete-event"></i>
                  </div> : ''   
            }
            <div className='col-sm-2'></div>
            {  _.contains(this.props.trip.organizers, Meteor.userId()) ?
                <div className='col-sm-4'>
                  <p>Add to Itineray</p>
                </div> : ''
            }  
          </div>
      </div>
    )
  }
})