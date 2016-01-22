storeImage = function(image){
  return Images.insert(image,function(err){
    if (err) console.log(err);
  });
};

retrieveImageUrlById = function(id,store){
  var store = store || 'images'
  var fileObj = Images.findOne({_id:id});
  return fileObj ? fileObj.url({store:store}) : null;
};

Meteor.methods({
  storeImage: function(image){
    return storeImage(image);
  },
  retrieveImageUrlById: function(id,store){
    return retrieveImageUrlById(id,store);
  }
})
