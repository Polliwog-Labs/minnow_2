Meteor.methods({
  
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
  //user search methods
  getUserById: function(id){
    return Meteor.users.findOne({_id:id});
  },

  //Invite methods
   getInvitesByUser: function(user){
    var trips = [];
    user && user.profile && user.profile.invites && (trips = user.profile.invites);
    return Trips.find({_id: { $in: trips}}).fetch();
   },

  inviteAccepted: function(user, trip){
    Meteor.users.update({_id:user._id}, {$pull:{"profile.invites": trip}});
    Trips.update({_id:trip},{$pull:{"pending": {_id: user._id}}});
    Meteor.users.update({_id:user._id}, {$push:{"profile.myTrips": trip}});
    return Trips.update({_id:trip}, {$push:{"members": user}},(err)=>{
      return !err;
    });
  },

  //trip methods

  inviteUserByEmail: function(inviteeEmail,id){
    var user = Accounts.findUserByEmail(inviteeEmail);
    if (!user){
      return false;
    }
    Meteor.users.update({_id:user._id},{$push:{"profile.invites":id}});
    return Trips.update( {_id:id}, {$push: {"pending": user}});
  },
  sendInvitationEmail: function(inviteeEmail,trip){
   /* Email.send({
      from:'team.polliwog@gmail.com',
      to:inviteeEmail,
      subject:'You\'re Invited: '+trip.name,
      text:'Welcome to Minnow! You\'ve been invited to join the trip '+trip.name+'.\nPlease check it out at http://localhost:3000/trip/'+trip._id+' to sign up!'
    });*/
    //commented out because I don't want to send lots of emails while testing
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
      members: [trip.user],
      organizers: [trip.user],
      created_by: trip.user,
      messages: [],
      pending: [],
      expenses: [],
      expense_dash: [],
      ideas: [],
      itinerary: []
    },(err,result)=> {if (!err) return result});
  },

  getIdeas: function () {

  },

  addIdea: function (event) {
    return Trips.update({_id: event.trip_id}, {$push: {"ideas": {
                name: event.name,
                desc: event.desc,
                og: event.og,
                date: event.date,
                upvotes: 0,
                created_by: event.created_by,
                cost: event.cost
            }}}, function (error) {
              if (error) {
                console.log('Failed to add idea: ', error)
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
  pushExpense: function(expense){
    return Trips.update({"_id": expense.trip_id}, {$push: {
      'expenses': {
        'description': expense.description, 
        'amount': Number(expense.amount),  
        'created_at': new Date(), 
        'created_by': expense.username,
        'split_with': expense.split_with
      }
    }},(error)=>{
      return !error;
    });
  }


})
