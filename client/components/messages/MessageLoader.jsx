MessageLoader = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired
  },
  getInitialState(){
    return({messages:null});
  },
  componentWillReceiveProps(newProps){
    this.setState({messages:newProps.messages});
  },
  message_list(){
    var messages = this.state.messages || this.props.messages;
    return messages.map(function(message){
      console.log(<MessageContent key={message.created_at} {...message}/>)
      return (<MessageContent key={message.created_at} {...message}/>);
    });
  },
	render(){
		return (<div>{this.message_list()}</div>);
	}
});

