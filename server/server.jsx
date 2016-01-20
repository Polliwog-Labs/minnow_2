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

storeImageByUrl = function(url){
  if (url.length){
    return Images.insert(url,function(err){
      if (err) console.log(err);
    });
  } else return false;
};

retrieveImageUrlById = function(id){
  return Images.findOne({_id:id}).url({store:"images"});
};

Meteor.methods({
  storeImageByUrl: function(url){
    return storeImageByUrl(url);
  },
  retrieveImageUrlById: function(id){
    return retrieveImageUrlById(id)
  }
})
