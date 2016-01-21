MessageContent = React.createClass({
	render(){
		return(
			<div className="list message-container">
				<a className='anchor-resize item item-avatar'>
					<img className="avatar-image" src="https://facebook.github.io/react/img/logo.svg" />
					<h2>{this.props.sender}</h2>
					<p>{this.props.text}</p>
				</a>
			</div>
		)
	}
})
