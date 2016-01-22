retrieveImageUrlById = function(id,store){
  var store = store || 'images'
  var fileObj = Images.findOne({_id:id});
  return fileObj ? fileObj.url({store:store}) : null;
};

Trips = new Mongo.Collection('trips');

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
  }
})
