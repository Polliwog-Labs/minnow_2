 Itinerary = new React.createClass({
  propTypes: {
    // event_id: React.PropTypes.string,
    // trip_id: React.PropTypes.string
  },
  mixins: [ReactMeteorData],
  getMeteorData: function(){
    return ({event: Itineraries.findOne({_id:this.props.event_id}) || {}});
  },
  submitEvent: function(){
    Itineraries.insert({
      name: ReactDOM.findDOMNode(this.refs.event_name).value,
      cost: ReactDOM.findDOMNode(this.refs.event_cost).value
    },function(err,event_id){
      if (err) console.log(err)
      else console.log(event_id);
    });
  },
  render: function(){
    return (<div>
              <EventMap />
              <form id='newTrip-form' className='form-group' onSubmit={this.submitEvent}>
                <input type="Text" placeholder="Event Name" defaultValue={this.data.event.name || null} ref="event_name" />
                <input type="Number" placeholder="Estimated Cost" defaultValue={this.data.event.cost || 0} ref="event_cost" />
                <button id="btn-submit" className='btn btn-default'>Submit</button>
              </form>
            </div>);
  }
});