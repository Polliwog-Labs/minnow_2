Messages = React.createClass({


	submitMessage(event){
		event.preventDefault();
		var message = ReactDOM.findDOMNode(this.refs.message_text).value;
		console.log("Message: ", message);
	},

	render(){
		return(
			<div className="message-wrapper">
			<MessageContent/>
			<footer className='list fixed-input'>
				<form className='item item-input-inset'>
					<label className='item-input-wrapper'>
						<input type='text' placeholder="message your group" ref='message_text'/>
					</label>
					<button className='button button-positive' onClick={this.submitMessage}>Submit</button>
				</form>	
			</footer>
			</div>
		)
	}
})