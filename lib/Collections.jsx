//Methods
var resizeImage = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize(800,600).stream().pipe(writeStream);
};

var renameImage = function(fileObj){
  var extension = /\.\w{3,4}$/.exec(fileObj.name());
  if (extension) {
    extension = extension[0];
    fileObj.name(fileObj._id+extension);
  }
};

var saveBG = function(fileObj){
  Backgrounds.insert(fileObj,function(){
    return;
  });
}

var backgroundImage = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize(1000,null).gravity('Center').crop(1000,200).stream().pipe(writeStream);
};

var profileImageResize = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize(300,300).gravity('Center').crop(250,250).stream().pipe(writeStream);
};

//Stores
var imageStore = new FS.Store.GridFS("images",{
  beforeWrite: renameImage,
  transformWrite: resizeImage
});

var BGStore = new FS.Store.GridFS("backgrounds",{
  beforeWrite: renameImage,
  transformWrite: backgroundImage
});

var profileStore = new FS.Store.GridFS("profilepics",{
  beforeWrite: renameImage ,
  transformWrite: profileImageResize
});

//Collections
Images = new FS.Collection("images",{
  stores: [imageStore,BGStore],
  filter: {
    allow: {
      contentTypes: ['image/*'],
    },
    deny: {
      extensions: ['gif']
    },
    onInvalid(){
      if (Meteor.isClient){
        alert('this is a bullshit image');
      }
    }
  }
});

Images.allow({
  download(){return true},
  insert(){return true},
  update(){return true},
  remove(){return true}
});


ProfilePics = new FS.Collection("profilepics",{
  stores: [profileStore],
  filter: {
    allow: {
      contentTypes: ['image/*'],
    },
    deny: {
      extensions: ['gif']
    },
    onInvalid(){
      if (Meteor.isClient){
        alert('this is a bullshit image');
      }
    }
  }
});

ProfilePics.allow({
  download(){return true},
  insert(userId){return !!userId},
  update(userId){return !!userId},
  remove(){return true}
});

//client-side implementations of server-only collections
if (Meteor.isClient){
  Trips = new Mongo.Collection('trips');
  Invites = new Mongo.Collection('invites');
  Users = Meteor.users;
}