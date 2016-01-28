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
  		return <div className="prof_pic_wrapper"><Image ionicClass='profile_pic' image_id={this.data.user_info.profile.imageId} width="250px" height="250px" profile={true} circle/></div>
  	}else{
  		return <div className="prof_pic_wrapper"><ReactBootstrap.Image src='/prof-placeholder.jpg' circle/></div>
  	}
  },

	render(){
		return(
			<div className='list'>
			<ReactBootstrap.Grid>
				<ReactBootstrap.Row>
					<ReactBootstrap.Col>
						{this.renderImage()}
						<ReactBootstrap.DropdownButton title="Update Picture" id="bg-vertical-dropdown-1">
							<div className=''>
								<input type="file" id="profile_pic" />
								<button className='button-selector button button-small button-positive message-button' type="submit" onClick={this.profilePicUploader}> Submit</button>
							</div>
						</ReactBootstrap.DropdownButton>
					</ReactBootstrap.Col>
				</ReactBootstrap.Row>
			</ReactBootstrap.Grid>
				<form className='item'>
				  <ReactBootstrap.Input type="text" label={this.data.user_info ? this.data.user_info.username : null} placeholder="Update username" />
	  		  <ReactBootstrap.Input type="email" label={this.data.user_info ? this.data.user_info.emails[0].address : null} placeholder="Update email" />
				 	<ReactBootstrap.ButtonInput type="submit" value="Update Profile" />
				</form>
			</div>
		)
	}

});