storeImage = function(image){
  return Images.insert(image,function(err){
    if (err) console.log(err);
  });
};

retrieveImageUrlById = function(id){
  return Images.findOne({_id:id}).url({store:"images"});
};

Meteor.methods({
  storeImage: function(image){
    return storeImage(image);
  },
  retrieveImageUrlById: function(id){
    return retrieveImageUrlById(id)
  }
})
