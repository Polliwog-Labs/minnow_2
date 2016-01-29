MessageLoader = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired
  },
  message_list(){
    var messages = this.props.messages;
    var members = this.props.members;
    return messages.sort(function(x,y){
      var xTime = new Date(x.created_at).getTime();
      var yTime = new Date(y.created_at).getTime();
      return yTime - xTime;
      //newest first
    }).map(function(message, index){
      var member_image = "";
      for(var i = 0; i < members.length; i++){
        if(members[i].username === message.sender){
          member_image = members[i].profile.imageId;
        }
      }
      return (<MessageContent image={member_image} index={index} key={index} {...message}/>);
    });
  },
	render(){
		return (<div>{this.message_list()}</div>);
	}
});

