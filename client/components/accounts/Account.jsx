Account = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {
    var user = Meteor.user();
    var user_info = Meteor.subscribe("UserData", user)
    var user_data = {};
    var prof_pic = Meteor.subscribe("ProfilePics")
    if(user_info.ready() && prof_pic.ready()){
    	user_data.user_info = Users.findOne();
    } 
   return user_data;
  },

  profilePicUploader(){
  	var file = $('#profile_pic')[0].files[0];
  	ProfilePics.insert(file, (err, data)=>{
  		if(err) console.log("did not upload photo: ", err)
  		else {
  				Users.update({_id:Meteor.user()._id}, {$set: {"profile.imageId":data._id}})	
  			}
  	})
  },

  renderImage(){
  	if(this.data.user_info && this.data.user_info.profile.imageId){
  		return <div className="profile-image"><Image image_id={this.data.user_info.profile.imageId} height="250px" profile={true}/></div>
  	}else{
  		return <ReactBootstrap.Image className="profile-image" src='/prof-placeholder.jpg' circle/>
  	}
  },

	render(){
		return(
			<div>
			<ReactBootstrap.Grid>
				<ReactBootstrap.Row>
					<ReactBootstrap.Col xs={6} md={4}>
						{this.renderImage()}
						<div>
							<input type="file" id="profile_pic" ></input>
							<button type="submit" onClick={this.profilePicUploader}> Submit</button>
						</div>
					</ReactBootstrap.Col>
				</ReactBootstrap.Row>
			</ReactBootstrap.Grid>
				<h2>Hello {this.data.user_info ? this.data.user_info.username : null}</h2>
				<h2>{this.data.user_info ? this.data.user_info.emails[0].address : null}</h2>
				<h4>Recent Trip Invites {this.data.user_info ? this.data.user_info.profile.invites.length : null}</h4>
			</div>
		)
	}

});