Messages = React.createClass({

	// mixins: [LinkedStateMixin],

	getInitialState: function(){
		console.log(this.props.trip.messages);
		return {key: this.props.trip.messages};
	},

	handleChange: function(event){
		this.setState({key: event.target.value});
	},



	submitMessage(event){
		event.preventDefault();
		var message = ReactDOM.findDOMNode(this.refs.message_text).value;
		Trips.update({"_id": this.props.trip._id}, {$push: {'messages': {'text': message, 'created_at': new Date(), 'sender': Meteor.user().username}}}, function(error){
			if(!error){
				console.log("inserted message into DB")
			}else if(error){
				console.log("error inserting message into DB: ", error);
			}
		});
	},

	render(){
		var key = this.state.key;
		return(
			<div className="message-wrapper">
			<MessageLoader messages={this.props.trip}/>
			<div className='list fixed-input'>
				<form className='item item-input-inset'>
					<label className='item-input-wrapper'>
						<input type='text' placeholder="message your group" ref='message_text'/>
					</label>
					<button className='button button-positive' value={key} onChange={this.handleChange} onClick={this.submitMessage}>Submit</button>
				</form>
			</div>
			</div>
		)
	}
})
