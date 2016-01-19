MessageLoader = React.createClass({
	
	propTypes:{
		messages: React.PropTypes.object.isRequired
	},

	render(){

		return(
			<div> 
				{this.props.messages.message}
			</div>
		)
	}
});