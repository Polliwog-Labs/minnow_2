MessageLoader = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired
  },
  message_list(){
    var messages = this.props.messages;
    return messages.sort(function(x,y){
      var xTime = new Date(x.created_at).getTime();
      var yTime = new Date(y.created_at).getTime();
      return yTime - xTime;
      //newest first
    }).map(function(message,index){
      return (<MessageContent index={index} key={index} {...message}/>);
    });
  },
	render(){
		return (<div>{this.message_list()}</div>);
	}
});

