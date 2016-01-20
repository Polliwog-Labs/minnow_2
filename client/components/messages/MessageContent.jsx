MessageContent = React.createClass({

	renderMessages(){
		return this.data.messages.map((Message) =>{
			
		})
		
	},
	render(){
		console.log('this.props', this.props)
		this.props.trip.messages.map((message)=> {
			var sender = this.props.trip.messages.sender;
			console.log('sender: ', sender);
			var message = this.props.trip.messages.text;
			console.log('message: ', message);
		});
		return(
			<div className='message-list'>
				<div className="list message-container">
					<a className='anchor-resize item item-avatar'>
						<img className="avatar-image" src="" />
						<h2>{this.sender}</h2>
						<p>{this.message}</p>
					</a>
				</div>
			</div>
			
		)
	}
})