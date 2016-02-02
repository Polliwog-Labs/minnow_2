
//client-side implementations of server-only collections
if (Meteor.isClient){
  Trips = new Mongo.Collection('trips');
  Invites = new Mongo.Collection('invites');
  Users = Meteor.users;
  Notifications = new Mongo.Collection('notifications');
  Images = new FS.Collection('images',{
    stores: [new FS.Store.GridFS("images"),new FS.Store.GridFS("backgrounds")]
  });
  ProfilePics = new FS.Collection('profilepics',{
    stores: [new FS.Store.GridFS("profilepics")]
  });
}