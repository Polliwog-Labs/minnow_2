Account = React.createClass({
	
	mixins: [ReactMeteorData],

	getMeteorData(){
		 var user = Meteor.user();
		 
		 return {};
	},
	render(){
		return(
			<div>
				<h2>Hello {user.username}</h2>
			</div>
		)
	}

});