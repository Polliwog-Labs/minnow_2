MessageLoader = React.createClass({
	render(){
		var message_list = this.props.messages.messages.map(function(message){
			return <MessageContent {...message}/>
		});
		return(
			<div>{message_list}</div>
		)
	}
});

