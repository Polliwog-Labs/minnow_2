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
      expenses: [],
      expense_dash: [],
      ideas: [],
      itinerary: []
    },(err,result)=> {if (!err) return result});
  },

  addIdea: function (event) {
    console.log('adding idea!')
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
  }


})
