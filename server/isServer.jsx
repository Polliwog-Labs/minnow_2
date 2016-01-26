if (Meteor.isServer) {
  Meteor.publish("singleTrip", function (tripId,user) {
    if (tripId && user) return Trips.find({_id: tripId},{$or:{
      $in:{"members":user._id}},
      $in:{"pending":user._id}});
  });
  
  Meteor.publish("Images",()=>{return Images.find()});
  
  Meteor.publish("ProfilePics",()=>{return ProfilePics.find()});
  
  //Makes sure the user is attached to the trip, as a member pending
  function validateUser(trip,user){
    if (trip && user) return !!Trips.findOne({_id:trip._id},{$or:{
      $in:{"members":user._id},
      $in:{"pending":user._id}}});
    return false;
  };

  Meteor.publish("tripUsers",(trip,user)=>{
    if (validateUser(trip,user)) return Users.find({_id:{$in:trip.members}});
    return null;
  });

  Meteor.publish("Invites",(user)=>{
    //takes a user or a string
    if (typeof user === 'object'){
      return Invites.find({invitee:user._id});
    } else if (typeof user === 'string' && /@/.test(user)){
      return Invites.find({recipient:user});
    }
    return null;
  });
}

// { trip_id: tripid,
//   invitee: optional userid, 
//   recipient: (email addy),
//   sender: userid}