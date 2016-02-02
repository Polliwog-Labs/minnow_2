ExpenseDashboard = React.createClass({

getInitialState(){
	return {
		show:false
	}
},

showModal(){
	    this.setState({show: true});
	  },

 hideModal(){
 	    this.setState({show: false});
	  },

 renderImage:function(){
 	var member = this.props;
	var key = Object.keys(member);
	var image = undefined;
	console.log("key",key[0]);
	Meteor.call('findUserByName', key[0], function (err, data){
		if(err) {
			console.log("error",err);
		} else {
			console.log("data", data);
			console.log("data._id", data._id);
			Meteor.call('retrieveProfilePic', data._id);
		}
	});

	console.log("image", image);

  	if(this.props && image){
  		return <Image ionicClass='avatar-image' image_id={image} height="80px" profile={true}/>
  	}else{
  		return <img className="avatar-image" src='https://facebook.github.io/react/img/logo.svg' />
  	}
  },


  showExpenses:function(){
  	this.showModal();
  	var user = Meteor.user();
  	var member = this.props;
	var key = Object.keys(member);

  	return (
          
	 <ExpensesWithOther user={user} listUser={key}/>

  		)
  	//Modal component filtering created by and split with between user and the selected div member 
  },

	render:function(){
		var member = this.props;
		var key = Object.keys(member);
		var setUp = this.props[key];
		var balance = Number((setUp).toFixed(2));



		return (
			<div className='item item-divider header-expenses'>
				{ balance === 0 ? <p className='balance'>You are even with {key}</p>:
				    balance > 0 ? 
					<p className='dark-blue-text balance'>{key} owes you ${balance}</p> : 
					<p className='dark-blue-text balance'>You owe {key} ${(balance) * -1}</p>
				}
			</div>

		)
	}


})
