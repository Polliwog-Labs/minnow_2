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

  getInitialState(){
    return {photo:null};
  },

  takePic(){
    MeteorCamera.getPicture({
       height: 600,
       width: 800,
       correctOrientation: true
    },(err,data)=>{
      //this.props.keepOpen();
      if (!err){
        this.setState({photo:data});
        this.profilePicUploader();
      } 
    });
  },
  shouldComponentUpdate(newprops,newstate){
    return !newstate;
  },

  profilePicUploader(){
  	var file = this.state.photo || $('#profile_pic')[0].files[0];
  	if (file) ProfilePics.insert(file, (err, data)=>{
      this.setState({photo:null});
  		if (err) console.log("did not upload photo: ", err)
  		else {
  				Users.update({_id:Meteor.user()._id}, {$set: {"profile.imageId":data._id}})	
  			}
  	})
  },

  profileEditor(e){
  	e.preventDefault();
  	
  	// var usernameUpdate = ReactDOM.findDOMNode(this.refs.usernameInput).value;
  	var emailUpdate = ReactDOM.findDOMNode(this.refs.emailInput).value;

  	// if(usernameUpdate !== ''){
			// Meteor.users.update({_id:Meteor.userId()}, {$set:{username: usernameUpdate}}, (err)=>{
  	// 		if(err) console.log('Error updating username', err)
  	// 		else{console.log('Success updating username')}
  	// 	});
    // }
    if(emailUpdate !== ''){
			Meteor.users.update({_id:Meteor.userId()}, {$set:{"emails": [{"address": emailUpdate}]}}, (err)=>{
				if(err) console.log('Error updating email', err)
				else{console.log('Success updating email')}
			});
  	}else{
  		return;
		}
  	// ReactDOM.findDOMNode(this.refs.usernameInput).value = "";
  	ReactDOM.findDOMNode(this.refs.emailInput).value = "";
  },

  renderImage(){
  	if(this.data.user_info && this.data.user_info.profile.imageId){
  		return <div className="prof_pic_wrapper"><Image ionicClass='profile_pic' image_id={this.data.user_info.profile.imageId} height='250px' width='250px' profile={true} circle/></div>
  	}else{
  		return <div className="prof_pic_wrapper"><ReactBootstrap.Image src='/prof-placeholder.jpg' circle/></div>
  	}
  },
  getCameraButton(){
    return ShowCamera ? <button className="dark-blue-text bg-ice account-pic-button" onClick={this.takePic}>Take Picture</button> : <div/>
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
                {this.getCameraButton()}
								<button className='button-selector button button-small button-positive message-button' type="submit" onClick={this.profilePicUploader}> Submit</button>
                <span>{this.state.photo ? 'Camera Photo' : ''}</span>
							</div>
						</ReactBootstrap.DropdownButton>
					</ReactBootstrap.Col>
				</ReactBootstrap.Row>
			</ReactBootstrap.Grid>
				<form className='item'>
					{/*<h3>{this.data.user_info ? this.data.user_info.username : null}</h3>
					<label className="row">
				  	<input ref='usernameInput' type="text" placeholder="Update username" />
				  </label>*/}
		  		<h3>{this.data.user_info ? this.data.user_info.emails.address || this.data.user_info.emails[0].address : null}</h3>
			  	<label className="row">
		  		  <input ref='emailInput' type="email" placeholder="Update email" />
					</label>
				 	<ReactBootstrap.ButtonInput type="submit" value="Update Profile" onClick={this.profileEditor} />
				</form>
			</div>
		)
	}

});
