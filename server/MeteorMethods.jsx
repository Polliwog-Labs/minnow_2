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
    console.log("hit the server")
    console.log(user);
    console.log(trip)
    Meteor.users.update({_id:user._id}, {$pull:{"profile.invites": trip}});
    Trips.update({_id:trip},{$pull:{"pending": user.emails[0].address}});
    Meteor.users.update({_id:user._id}, {$push:{"profile.myTrips": trip}});
    Invites.remove({recipient:user.emails[0].address,trip_id:trip});
    return Trips.update({_id:trip}, {$push:{"members": user._id}},(err)=>{
      return !err;
    });
  },
  getUserInvites: function(email){
    return Invites.find({'recipient':email}).fetch().map(invite=>{return invite.trip_id;});
  },

  //trip methods
  inviteUserByEmail: function(inviteeEmail,id){
    var user = Accounts.findUserByEmail(inviteeEmail);
    if (!user){
      return false;
    }
    return Meteor.users.update({_id:user._id},{$push:{"profile.invites":id}});
    // Invites.insert({invitee})
    // return Trips.update( {_id:id}, {$push: {"pending": user}});
  },
  sendInvitationEmail: function(inviteeEmail,trip){
   /* Email.send({
      from:'team.polliwog@gmail.com',
      to:inviteeEmail,
      subject:'You\'re Invited: '+trip.name,
      text:'Welcome to Minnow! You\'ve been invited to join the trip '+trip.name+'.\nPlease check it out at http://localhost:3000/trip/'+trip._id+' to sign up!'
    });*/
    //commented out because I don't want to send lots of emails while testing
    console.log('called sendInvitationEmail')
    return Invites.insert({
      trip_id:trip._id,
      recipient: inviteeEmail,
      sender: ''//not yet implemented
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
});
