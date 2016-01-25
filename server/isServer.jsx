if (Meteor.isServer) {
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("singleTrip", function (tripId) {
    return Trips.find({_id: tripId})
  });
}