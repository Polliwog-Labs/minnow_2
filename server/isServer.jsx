if (Meteor.isServer) {
  Meteor.publish("singleTrip", function (tripId,user) {
    if (tripId && user) return Trips.find({_id: tripId},{$or:{
      $in:{"members":user._id}},
      $in:{"pending":user._id}});
  });

  Meteor.publish("userTrips", function (user){
    return Trips.find({_id:{$in:user.profile.invites}});
  });

  Meteor.publish("Images",()=>{return Images.find()});

  Meteor.publish("ProfilePics",()=>{return ProfilePics.find()});

  Meteor.publish("tripUsers",(trip)=>{
    return Users.find({_id:{$in:trip.members}});
  });

  Meteor.publish("UserData",(user)=>{
    return Users.find({_id:user._id});
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
