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

var imageStore = new FS.Store.GridFS("images",{
  beforeWrite: renameImage,
  transformWrite: resizeImage
});

var BGStore = new FS.Store.GridFS("backgrounds",{
  beforeWrite: renameImage,
  transformWrite: backgroundImage
});

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

