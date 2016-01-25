Messages = React.createClass({
	propTypes: {
		trip: React.PropTypes.object.isRequired
	},
	getInitialState(){
		return ({messages:null});
	},
	submitMessage(event){
		event.preventDefault();
		var message = ReactDOM.findDOMNode(this.refs.message_text).value;
		Meteor.call('pushMessage',{
      trip_id: this.props.trip._id,
      messageText: message,
      sender: Meteor.user().username
		},(err)=>{
			if (err) console.log(err)
			else this.getMessages();
		});
		ReactDOM.findDOMNode(this.refs.message_text).value = '';
	},
	getMessages(){
		// Meteor.call('getTripById',this.props.trip._id,(err,data)=>{
		// 	!err && this.setState({messages:data.messages});
		// });
    this.props.updateParent('Messages');
	},
	componentDidMount(){
		var that = this;
		window.refreshInterval = setInterval(function(){
			that.getMessages();
		},2000);
	},
	componentWillUnmount(){
    clearInterval(window.refreshInterval);
	},
	render(){
		return(
			<div className='list fixed-input'>
				<form className='item item-input-inset'>
					<label className='item-input-wrapper'>
						<input type='text' placeholder="message your group" ref='message_text'/>
					</label>
					<button className='button button-positive' onClick={this.submitMessage}>Submit</button>
				</form>
				<div className="message-wrapper">
					<MessageLoader messages={this.state.messages || this.props.trip.messages} />
				</div>
		</div>
		)
	}
})
