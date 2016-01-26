EventMap = React.createClass({
  mixins: [ReactMeteorData],
  componentDidMount() {
    GoogleMaps.load({key:'AIzaSyDrj8LPd0RL2sGKYND-us2UlB5kexUdjJ0',
                    libraries: 'places'});
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
      zoom: 10 
    };
  },
  render() {
    if (this.data.loaded) {
      return <GoogleMap className="map-container" name="event-map" options={this.data.mapOptions} />;
    }

    return <div>Loading map...</div>;
  }
});

GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },
  componentDidMount() {
    var eventMap = GoogleMaps.create({
      name: this.props.name,
      element: ReactDOM.findDOMNode(this),
      options: {
        center: new google.maps.LatLng(30.2932637, -97.7571322),
        //MakerSquare!
        zoom: 10 
      }//this.props.options
    });

    GoogleMaps.ready(this.props.name, function(map) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(30.2932637, -97.7571322),
        map: map.instance
      });
      console.log('map ready');
    });
  },
  componentWillUnmount() {
    if (GoogleMaps.maps[this.props.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
      delete GoogleMaps.maps[this.props.name];
    } 
  },
  render() {
    return <div className="map-container"></div>;
  }
});