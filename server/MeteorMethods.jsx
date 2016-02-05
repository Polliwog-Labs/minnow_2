Meteor.methods({
  debug(value){
    console.log(value)
  },
  //Images methods
  storeImage: function(image){
    return Images.insert(image,function(err,result){
      if (!err) return result;
    });
  },
  retrieveImageUrlById: function(id,store){
    var store = store || 'images'
    var fileObj = Images.findOne({_id:id});
    return fileObj ? fileObj.url({store:store}) : null;
  },

  //Profile Pic methods
  storeProfilePic: function(image){
    return ProfilePics.insert(image,function(err,result){
      if (!err) return result;
    });
  },

  // //Profile Pic methods
  // storeProfilePic: function(image){
  //   return ProfilePics.insert(image,function(err,result){
  //     if (!err) return result;
  //   });
  // },

  retrieveProfilePic: function(id){
    var fileObj = ProfilePics.findOne({_id:id});
    return fileObj ? fileObj.url() : null;
  },

  //user search methods
  getUserById: function(id){
    return Meteor.users.findOne({_id:id});
  },

  //notifcatio
  notify(recipient,clear){
    if (clear) return Notifications.remove({
      recipient: recipient
    });
    return Notifications.insert({
      recipient: recipient
    });
  },

  //Invite methods
  getInvitesByUser: function(user){
    var trips = [];
    user && user.profile && user.profile.invites && (trips = user.profile.invites);
    return Trips.find({_id: { $in: trips}}).fetch();
  },

  getTripsFromInvites: function(invites){
    //takes an array of invites
    if (invites) return Trips.find({_id:{$in:invites.map(invite=>{
      return invite.trip_id;
    })}}).fetch();
  },

  inviteAccepted: function(user, trip){

    //Update the expense_dash collection on accept 

    var expense_dash = trip.expense_dash;
    var username = user.username
    var updatedDash = [];

    var newMemberObject = {user: username};
    
    expense_dash.map(function (member){
      member[username] = 0;
      updatedDash.push(member);
    });

    expense_dash.map(function (member){
      var otherMember = member.user;
      newMemberObject[otherMember] = 0;
    });

    console.log("newMemberObject", newMemberObject);
    updatedDash.push(newMemberObject);
    Meteor.call('notify',user._id,'clear');
    Trips.update({_id: trip._id}, {$set: {expense_dash: updatedDash}});
    Meteor.users.update({_id:user._id}, {$pull:{"profile.invites": trip._id}});
    Trips.update({_id:trip._id},{$pull:{"pending": user.emails[0].address}});
    Meteor.users.update({_id:user._id}, {$push:{"profile.myTrips": trip._id}});
    Invites.remove({recipient:user.emails[0].address,trip_id:trip._id});
    return Trips.update({_id:trip._id}, {$push:{"members": user._id}},(err)=>{
      return !err;
    });
  },

  inviteDeclined: function(user, trip){
    Meteor.users.update({_id:user._id}, {$pull:{"profile.invites": trip}});
    Trips.update({_id:trip},{$pull:{"pending": user.emails[0].address}});
    Invites.remove({recipient:user.emails[0].address,trip_id:trip});
    Meteor.call('notify',user._id,'clear');
    return Trips.update({_id:trip}, {$push:{"declined": user.username}}, (err)=>{
      return !err;
    });
  },

  getUserInvites: function(email){
    return Invites.find({'recipient':email}).fetch().map(invite=>{return invite.trip_id;});
  },

  convertNotifications: function(user){
    return Notifications.update({'recipient':user.emails[0].address},{$set:{recipient:user._id}});
  },

  //trip methods
  inviteUserByEmail: function(inviteeEmail,id){
    var user = Accounts.findUserByEmail(inviteeEmail.toLowerCase());
    if (!user){
      Meteor.call('notify',inviteeEmail);
      return false;
    }
    Meteor.call('notify',user._id);
    return Meteor.users.update({_id:user._id},{$push:{"profile.invites":id}});
  },

  sendInvitationEmail: function(inviteeEmail,trip,user){
   // Email.send({
   //    from:'team.polliwog@gmail.com',
   //    to:inviteeEmail,
   //    subject:'You\'re Invited: '+trip.name,
   //    text:'Welcome to Minnow! '+user.username+' has invited you to join the trip '+trip.name+'.\nPlease check it out at http://localhost:3000/invites/'+inviteeEmail+' to sign up!'
   //  });
    //commented out because I don't want to send lots of emails while testing
    console.log('called sendInvitationEmail')
    return Invites.insert({
      trip_id:trip._id,
      recipient: inviteeEmail.toLowerCase(),
      sender: user.username
    });
  },

  getTripById: function(id){
    return Trips.findOne({_id:id});
  },

  getTripsByUser: function(user){
    var trips = [];
    user && user.profile && user.profile.myTrips && (trips = user.profile.myTrips);
    return Trips.find({_id: { $in: trips}}).fetch();
  },

  updateTrip: function(update){
    return Trips.update({_id:update.trip_id},{$set: {
                  name: update.name,
                  members: update.members,
                  dates: update.dates,
                  image_id: update.image_id
                }});
  },

  createTrip: function(trip){
    return Trips.insert({
      name: trip.name,
      members: [trip.user._id],
      organizers: [trip.user._id],
      created_by: trip.user._id,
      dates:[0,0],
      messages: [],
      pending: [],
      declined: [],
      expenses: [],
      expense_dash: [{user: trip.user.username}],
      ideas: [],
      itinerary: [],
      photos:[]
    },(err,result)=> {if (!err) return result});
  },

  getOrganizer: function(trip){
    var organizer = Meteor.users.findOne({_id:trip.organizers[0]});
    return organizer;
  },

  //idea methods
  addIdea: function (event) {
    return Trips.update({_id: event.trip_id}, {$push: {"ideas": {
                name: event.name,
                desc: event.desc,
                og: event.og,
                date: event.date,
                time: '',
                upvotes: 0,
                created_by: event.created_by,
                created_at: event.created_at,
                cost: event.cost
            }}}, function (error) {
              if (error) {
                console.log('Failed to add idea: ', error)
              }
          })
  },

  addIdeaToItin: function (tripId, idea, dateTime) {
    console.log('dateTime: ', dateTime)
    return Trips.update({_id: tripId}, {$push: {'itinerary': idea}}, function (error) {
      if (error) {
        console.log('failed to add to itinerary: ', error);
      } else {
        console.log(idea.name)
        Trips.update({_id: tripId}, {$pull: {'ideas': {created_at: idea.created_at}}}, function (error) {
          if (error) {
            console.log('failed to remove idea after adding to itinerary: ', error)
          } else {
            Trips.update({_id: tripId, 'itinerary.created_at': idea.created_at}, {$set: {
                'itinerary.$.date' :dateTime.date,
                'itinerary.$.time' : dateTime.time,
                'itinerary.$.utc' : dateTime.utc,
                'itinerary.$.unixTime' : dateTime.unixTime
              }
            }, function (error) {
              if (error) {
                console.log('failed to update time/date: ', error)
              }
            })
          }
        })
      }
    })
  },

  addEvent: function (tripId, event) { //direct add from itinerary
    return Trips.update({_id: tripId}, {$push: {'itinerary': event}}, function (error) {
      if (error) {
        console.log('error adding event to itinerary: ', error)
      }
    })
  },

  deleteIdea: function (tripId, createdAt) {
    return Trips.update({_id: tripId}, {$pull: {'ideas': {created_at: createdAt}}}, function (error) {
      if (error) {
        console.log('idea failed to delete: ', error)
      }
    })
  },

  ideaUpVote: function (tripId, createdAt) {
    return Trips.update({_id: tripId, 'ideas.created_at': createdAt}, {$inc: {'ideas.$.upvotes': 1}}, function (error) {
      if (error) {
        console.log('failed to upvote: ', error)
      }
    })
  },

  ideaDownVote: function (tripId, createdAt) {
    return Trips.update({_id: tripId, 'ideas.created_at': createdAt}, {$inc: {'ideas.$.upvotes': -1}}, function (error) {
      if (error) {
        console.log('failed to down vote: ', error)
      }
    })
  },

  //Itinerary
  deleteEvent: function (tripId, createdAt) {
    return Trips.update({_id: tripId}, {$pull: {'itinerary': {created_at: createdAt}}}, function (error) {
      if (error) {
        console.log('event failed to delete: ', error)
      }
    })
  },

  //messages
  pushMessage: function(message){
    return Trips.update({_id:message.trip_id}, {$push: {
      'messages': {'text': message.messageText, 'created_at': new Date(), 'sender': message.sender}}}, (err)=>{
      return !err;
    });
  },

  //expenses

  findUserByName:function(username){
    var user = Users.findOne({username:username});
    return user
  },

  payExpense:function(payingUser, member, dash, trip){
    var oldBalance = undefined;
    var newExpenseDash = dash.map(function (userObject) {
      if(userObject.user === payingUser) {
        oldBalance = userObject[member];
        userObject[member] = 0;
      } else if(userObject.user === member) {
        userObject[payingUser] = 0;
      }
      return userObject;
    });


    var description = payingUser+" paid "+member+" $"+(oldBalance * -1);
    console.log("description", description)
    Trips.update({_id: trip._id}, {$set: {expense_dash: newExpenseDash}});

    return Trips.update({_id: trip._id}, {$push: {
      expenses:{
        'description': description,
        'created_at': new Date(),
        'created_by': payingUser,
        'split_with': [member]
      }
    }});
  },


  pushExpense: function(expense,user,dash){
    
    var newExpenseDash = dash.map(function (userObject){
      if(userObject.user === user.username) {
         expense.split_with.map(function (splitUser) {
            var oldBalance = userObject[splitUser];
            userObject[splitUser] = oldBalance + expense.amount;
         });
      }
      var splitList = expense.split_with;
      if(_.contains(splitList, userObject.user)) {
        var createdSplit = user.username;
        var oldBalance = userObject[createdSplit];
        userObject[createdSplit] = oldBalance - expense.amount;
      } 
        return (userObject);
    });

    Trips.update({_id: expense.trip_id}, {$set: {expense_dash: newExpenseDash}});

    return Trips.update({"_id": expense.trip_id}, {$push: {
      'expenses': {
        'description': expense.description,
        'amount': Number(expense.amount),
        'created_at': new Date(),
        'created_by': user.username,
        'split_with': expense.split_with
      }
    }},(error)=>{
      return !error;
    });
  }
});
