Trips = new Mongo.Collection('trips');
Events = new Mongo.Collection('events');
var resizeImage = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize(800,600).stream().pipe(writeStream);
};

var renameImage = function(fileObj){
  var extension = /\.\w{3,4}$/.exec(fileObj.name());
  if (extension) {
    extension = extension[0];
    fileObj.name(fileObj._id+extension,{store:"images"})
  }
};

var imageStore = new FS.Store.GridFS("images",{
  beforeWrite: renameImage,
  transformWrite: resizeImage
});

Images = new FS.Collection("images",{
  stores: [imageStore],
});