Photos = React.createClass({
  getInitialState: function () {
    return {
      slickGoTo: 0
    };
  },
  changeHandler: function(e) {
    this.setState({slickGoTo: e.target.value});
  },

  addPhoto: function(event){
    event.preventDefault();
    var photo = $('#addPhoto')[0].files[0];
    console.log(photo)
    console.log(photo.constructor)
    var tripId = this.props.trip._id

    if (photo.constructor === File) {
      Images.insert(photo, (error, image) =>{
        if (error) {
          console.log('image failed to add: ', error)
        } else {
          console.log('image added to db', image)
          Trips.update({_id: tripId}, {$push: {'photos': image._id}}, function (error) {
            if (error) {
              console.log('error adding image id to trip: ', error)
            } else {
              console.log('imageId added to trip')
            }
          })
        }
      })
    }

    // if (typeof photo === 'string'){
    //   Meteor.call('storeImage',photo,(err,data)=>{
    //     if (err) console.log(err)
    //     else {
    //       // Trips.update({_id:this.props.trip._id},{$set:this.getHelperObj(data._id)});
    //       Meteor.call('addPhotoToTrip', this.props.trip._id, data._id)
    //     }
    //   });
    // } else if (photo.constructor === File) {
    //   Images.insert(photo,(err,data)=>{
    //     if (err) console.log(err)
    //     else {
    //       Meteor.call('addPhotoToTrip', this.props.trip._id, data._id)
    //     }
    //   })
    // } else Meteor.call('addPhotoToTrip', this.props.trip._id, data._id)
    // // $('.close').click();
  },

// if (file.constructor === File) {
  // Images.insert(file,(err,data)=>{
  //   if (err) console.log(err)
  //   else {
  //     Trips.update({_id:this.props.trip._id},{$set:this.getHelperObj(data._id)});
  //   }
  // })

  render: function () {
    var settings = {
      dots: false,
      infinite: true,
      arrows:false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      slickGoTo: this.state.slickGoTo || 0
    };
    return (
      <div className='photos-body'>
        <Slider {...settings}>
          <div className='' ><img className='photo-scroll' src={'http://i.telegraph.co.uk/multimedia/archive/02480/sony-hock_2480997k.jpg'} /></div>
          <div className='' ><img className='photo-scroll' src={'http://images.nationalgeographic.com/wpf/media-live/photos/000/284/cache/around-the-world-fountain-richardson_28445_600x450.jpg'} /></div>
       </Slider>
       <div className='col'>
          <span className="btn btn-sm btn-file">
            + Photo <input type="file" accept="image/*" ref='newPhoto' id='addPhoto' onChange={this.addPhoto}/>
          </span>
        </div>
      </div>
    );
  }
});

  // render: function () {
  //   var settings = {
  //     dots: true,
  //     lazyLoad: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1
  //   };
  //   return (
  //     <div>
  //       <h2> Lazy Load</h2>
  //       <Slider {...settings}>
  //         <div><img src={'http://i.telegraph.co.uk/multimedia/archive/02480/sony-hock_2480997k.jpg'} /></div>
  //         <div><img src={'http://images.nationalgeographic.com/wpf/media-live/photos/000/284/cache/around-the-world-fountain-richardson_28445_600x450.jpg'} /></div>
  //       </Slider>
  //     </div>
  //   );
  // }