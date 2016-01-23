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
    return messages.map(function(message,index){
      return (<MessageContent index={index} key={index} {...message}/>);
    });
  },
	render(){
		return (<div>{this.message_list()}</div>);
	}
});

