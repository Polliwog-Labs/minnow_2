Messages = React.createClass({
	propTypes: {
		trip: React.PropTypes.object.isRequired
	},
	mixins: [ReactMeteorData],
	getMeteorData(){
		var trip = Trips.findOne({_id:this.props.trip._id});
		return {trip:trip}
	},
	submitMessage(event){
		event.preventDefault();
		var message = ReactDOM.findDOMNode(this.refs.message_text).value;
		Trips.update({_id:this.data.trip._id}, {$push: {'messages': {'text': message, 'created_at': new Date(), 'sender': Meteor.user().username}}}, (error)=>{
			if(!error){
				console.log("inserted message into DB")
			}else if(error){
				console.log("error inserting message into DB: ", error);
			}
		});
	},
	render(){
		return(
			<div className="message-wrapper">
			<MessageLoader messages={this.data.trip}/>
			<div className='list fixed-input'>
				<form className='item item-input-inset'>
					<label className='item-input-wrapper'>
						<input type='text' placeholder="message your group" ref='message_text'/>
					</label>
					<button className='button button-positive' onClick={this.submitMessage}>Submit</button>
				</form>	
			</div>
			</div>
		)
	}
})