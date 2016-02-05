Photos = React.createClass({
  getInitialState: function () {
    return {
      slickGoTo: 0,
    };
  },
  changeHandler: function(e) {
    this.setState({slickGoTo: e.target.value});
  },

  addPhoto: function(event,photo){
    event && event.preventDefault();
    var photo = photo || $('#addPhoto')[0].files[0];
    var tripId = this.props.trip._id
    if (photo) {
      Images.insert(photo, (error, image) =>{
        if (error) {
          console.log('image failed to add: ', error)
        } else {
          console.log('image added to db', image)
          Trips.update({_id: tripId}, {$push: {'photos': image._id}}, function (error) {
            if (error) {
              console.log('error adding image id to trip: ', error)
            } else {
              // that.props.updateParent('Photos')
            }
          })
        }
      })
    }
  },
  takePic(){
    MeteorCamera.getPicture({
      width:800,
      height:600,
      correctOrientation: true
    },(err,data)=>{
      if (!err){
        this.addPhoto(null,data);
      }
    });
  },

  componentWillMount() {
    this.props.updateParent('Photos');
  },

  renderPhotos: function () {
    return this.props.trip.photos.map(function (photoId, index) {
      return <div className='col' key={index}><Image ionicClass='photo-scroll' image_id={photoId} height="300px"/></div>
    })
  },

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
        <div className='col'></div>
        <Slider {...settings}>
          <div><Image ionicClass='photo-scroll' image_id={this.props.trip.image_id} height="300px" /></div>
          {this.renderPhotos()}
        </Slider>
        <div className='col'></div>
        <div className='col'>
          <span className="btn btn-sm btn-file">
            + Photo <input type="file" accept="image/*" ref='newPhoto' id='addPhoto' onChange={this.addPhoto}/>
          </span>
          <span className="btn btn-sm btn-file" onClick={this.takePic}>Take Picture</span>
          <span>{this.state.photo ? 'Camera Photo' : ''}</span>
        </div>
      </div>
    );
  }
});
