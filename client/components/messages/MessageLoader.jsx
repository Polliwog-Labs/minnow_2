MessageLoader = React.createClass({
	render(){
		var params = {
			text: '',
			created_at: '',
			sender: ''
		};
		for(var key in this.props.messages){
			this.props.messages[key] && (params[key] = this.props.messages[key]);
		};
		console.log('Params!!!: ', params);
		return(
			<div className="list message-container">
				<a className='anchor-resize item item-avatar'>
					<img className="avatar-image" src="https://facebook.github.io/react/img/logo.svg" />
					<h2>{params}</h2>
					<p>{params}</p>
				</a>
			</div>
		)
	}
});

