EventMap = React.createClass({
  mixins: [ReactMeteorData],
  componentWillMount() {
    $.getScript('https://maps.googleapis.com/maps/api/js?libraries=places',()=>{
      GoogleMaps.initialize();
      this.setState({mapApi:true});
    })
    // GoogleMaps.load({key:'AIzaSyDrj8LPd0RL2sGKYND-us2UlB5kexUdjJ0',
    //                 libraries: 'places'});
  },
  getMeteorData() {
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && this._mapOptions()
    };
  },
  _mapOptions() {
    return {
      center: new google.maps.LatLng(30.2932637, -97.7571322),
      //MakerSquare!
      zoom: 10,
      noClear: true 
    };
  },
  render() {
    if (this.data.loaded)
      return (<div> 
                <GoogleMap name="eventmap" options={this.data.mapOptions} />
                <form>
                  <input type="text" className="placesSearch" placeholder="Search by Location" />
                </form>
              </div>);

    return <div>Loading map...</div>;
  }
});

GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired,
  },
  componentDidMount() {
    var eventMap = GoogleMaps.create({
      name: this.props.name,
      element: ReactDOM.findDOMNode(this),
      options: this.props.options
    });
    var search = new google.maps.places.SearchBox({
      inputField: $('placesSearch')[0]
    });

    GoogleMaps.ready(this.props.name, (map)=> {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(30.2932637, -97.7571322),
        map: GoogleMaps.get(this.props.name).instance,
        optimized: false
      });
      console.log('map ready');
      this.setState({loaded: true});
    });
  },
  componentWillUnmount() {
    if (GoogleMaps.maps[this.props.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
      delete GoogleMaps.maps[this.props.name];
    } 
  },
  render() {
    return <div className="map-canvas"></div>;
  }
});