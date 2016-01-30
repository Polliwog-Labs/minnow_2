if (Meteor.isServer) {
  //serverside trips stuff
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

  Meteor.publish("myTrips", function (user){
    return Trips.find({members:{$in:[user._id]}});
  });

  Meteor.publish("UserData", (user) => {
      return Users.find({_id:user._id});
  });

  Meteor.publish("tripUsers",(trip)=>{
    return Users.find({_id:{$in:trip.members}});
  });

  //serverside invite stuff
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

  //serverside user stuff
  Users = Meteor.users;

  Users.allow({
    insert(){return false},
    update(userId,doc){return userId === doc._id},
    remove(userId){return userId === doc._id}
  });

  //serverside notifications
  Notifications = new Mongo.Collection('notifications');

  Notifications.allow({
    remove(){return true}
  });

  //subsets of profilepics and images
  Meteor.publish("ProfilePics",()=>{return ProfilePics.find()});
  Meteor.publish("Images",()=>{return Images.find()});
  Meteor.publish("Notifications",()=>{return Notifications.find()});
}

// { trip_id: tripid,
//   invitee: optional userid,
//   recipient: (email addy),
//   sender: userid}
