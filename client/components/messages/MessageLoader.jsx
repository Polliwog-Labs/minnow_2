MessageLoader = React.createClass({
	renderMessages(){
		var params = {
			text: '',
			created_at: '',
			sender: ''
		};
		for(var key in this.props.messages){
			this.props.messages[key] && (params[key] = this.props.messages[key]);
		};
		params.messages.map(function(message){
			var message_text = message.text;
			console.log("message_text: ", message_text)
			var sender_name = message.sender;
			console.log("sender_name: ", sender_name)
		})
	},
	render(){

		return(
			<div className="list message-container">
			{this.renderMessages()}
				<a className='anchor-resize item item-avatar'>
					<img className="avatar-image" src="https://facebook.github.io/react/img/logo.svg" />
					<h2>{this.sender_name}</h2>
					<p>{this.message_text}</p>
				</a>
			</div>
		)
	}
});

