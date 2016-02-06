MessageLoader = React.createClass({
  propTypes: {
    trip: React.PropTypes.object.isRequired
  },
  message_list(){
    if (this.props.trip && this.props.trip.messages && this.props.members) {
      var messages = this.props.trip.messages;
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
    } else return <div/>;
  },

  shouldComponentUpdate(newprops){
    if (!newprops.trip) return false;
    return true;
  },

	render(){
		return (<div className="message-wrapper">{this.message_list()}</div>);
	}
});

