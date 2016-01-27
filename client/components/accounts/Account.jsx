Account = React.createClass({
	
	mixins: [ReactMeteorData],

	getMeteorData(){
		 var user = Meteor.user();
		 return {user};
	},
	render(){
		return(
			<div>
			<ReactBootstrap.Grid>
				<ReactBootstrap.Row>
					<ReactBootstrap.Col xs={6} md={4}>
						<ReactBootstrap.Image src='/prof-placeholder.jpg' circle/>
					</ReactBootstrap.Col>
				</ReactBootstrap.Row>
			</ReactBootstrap.Grid>
				<h2>Hello {Meteor.user().username}</h2>
				<h2>{Meteor.user().emails[0].address}</h2>
				<h4>Recent Trip Invites {Meteor.user().profile.invites.length}</h4>
			</div>
		)
	}

});