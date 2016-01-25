MessageLoader = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired
  },
  message_list(){
    var messages = this.props.messages;
    return messages.map(function(message,index){
      return (<MessageContent index={index} key={index} {...message}/>);
    });
  },
	render(){
		return (<div>{this.message_list()}</div>);
	}
});

