if (Meteor.isServer) {
  // Trips = new Mongo.Collection('trips');
  Meteor.publish("singleTrip", function (tripId,user) {
    if (tripId && user) return Trips.find({_id: tripId},{$or:{
      $in:{"members":user._id}},
      $in:{"pending":user._id}});
  });
  Meteor.publish("Images",()=>{return Images.find()})

}