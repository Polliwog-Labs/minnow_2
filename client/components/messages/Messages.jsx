Messages = React.createClass({
	propTypes: {
		trip: React.PropTypes.object.isRequired
	},
	// getInitialState(){
	// 	return ({messages:this.props.trip.messages});
	// },
	submitMessage(event){
		event.preventDefault();
		var message = ReactDOM.findDOMNode(this.refs.message_text).value;
    Trips.update({_id:this.props.trip._id},{$push:{'messages':{
		    	'text': message, 
		    	'created_at': new Date(), 
		    	'sender': Meteor.user().username
		    }
		  }
		},(err,data)=>{
  		!err && this.props.updateParent('Messages');
  	});
		ReactDOM.findDOMNode(this.refs.message_text).value = '';
	},
	render(){
		return(
			<div className='list fixed-input'>
				<form className='item item-input-inset'>
					<label className='item-input-wrapper'>
						<input type='text' placeholder="message your group" ref='message_text'/>
					</label>
					<button className='button button-small button-positive message-button' onClick={this.submitMessage}> Send </button>
				</form>
				<div className="message-wrapper">
					<MessageLoader messages={this.props.trip.messages} />
				</div>
		</div>
		)
	}
})
