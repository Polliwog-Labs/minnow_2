MessageContent = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return Trips.find({}).fetch();
	},
	renderMessage(){
		return this.data.messages.map((Message) =>{
			<MessageLoader key={message._id} message={text}/>
		})
		
	},
	render(){
		return(
			<div className='message-list'>
				<div className="list message-container">
					<a className='anchor-resize item item-avatar'>
						<img className="avatar-image" src="" />
						<h2></h2>
						<p></p>
					</a>
				</div>
			</div>
			
		)
	}
})