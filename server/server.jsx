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

  //trip methods

  inviteUserByEmail: function(inviteeEmail,id){
    var user = Accounts.findUserByEmail(inviteeEmail);
    if (!user){
      return false;
    }

    return Trips.update( {_id:id}, {$push: {"pending": user}});
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
      expense_dash: []
    },(err,result)=> {if (!err) return result});
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
