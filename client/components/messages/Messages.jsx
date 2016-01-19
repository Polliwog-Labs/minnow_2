Messages = React.createClass({
	

	submitMessage(){

		Trip.insert(messages: [{"text": ReactDOM.findDOMNode(this.refs.message_text).value}], function(error){
			if(error){
				console.log('error inserting indo MessageCollection: ',error)
			}else if(!error){
				console.log("Success on entering message into Database.")
			}
		});

		
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