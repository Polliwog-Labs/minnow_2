if (Meteor.isServer) {
  Trips = new Mongo.Collection('trips');

  Trips.allow({
    insert(userId){return !!userId},
    update(userId,doc){
      return _.any(doc.organizers.concat(doc.members),id=>{
        return id === userId;
      })
    },
    remove(userId,doc){
      return _.any(doc.organizers,organizer=>{
        return organizer === userId
      });
    }
  });

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

  Meteor.publish("UserData", (user) => {
      return Users.find({_id:user._id});
  });

  Meteor.publish("tripUsers",(trip)=>{
    return Users.find({_id:{$in:trip.members}});
  });

  Meteor.publish("UserData",(user)=>{
    return Users.find({_id:user._id});
  });

  Invites = new Mongo.Collection('invites');

  Invites.allow({
    insert(userId){return !!userId},
    update(){return true},
    remove(){return true}
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
