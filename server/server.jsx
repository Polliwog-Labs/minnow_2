var resizeImage = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize(null,300).stream().pipe(writeStream);
};

var imageStore = new FS.Store.GridFS("images",{
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
