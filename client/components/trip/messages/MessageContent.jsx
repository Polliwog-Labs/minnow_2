MessageContent = React.createClass({

	propTypes:{
		sender: React.PropTypes.string.isRequired,
		text: React.PropTypes.string,
	},

	renderImage(){
  	if(this.props && this.props.image){
  		return <Image ionicClass='avatar-image' image_id={this.props.image} height="80px" profile={true}/>
  	}else{
  		return <img className="avatar-image" src='https://facebook.github.io/react/img/logo.svg' />
  	}
  },

	render(){
		return(
			<div className="list message-container bg-ice">
				<a className='anchor-resize item item-avatar bg-ice'>
					{this.renderImage()}
					<h4 className="h-four-override">{this.props.sender}</h4>
					<p>{this.props.text}</p>
				</a>
			</div>
		)
	}
})
