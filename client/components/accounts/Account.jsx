Account = React.createClass({
	
	mixins: [ReactMeteorData],

	getMeteorData(){
		 var user = Meteor.user();
		 console.log("user: ", user);
	},
	render(){
		return(
			<div>Hello Account</div>
		)
	}

});