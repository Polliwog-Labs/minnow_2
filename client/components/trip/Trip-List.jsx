TripList = React.createClass({
  _isMounted: false,
  propTypes: {
    trip: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {url:AbsUrl+'/group-beach.jpg'}
  },
  getImageUrl(){
    var count = 1;
    function getThisImageUrl(context){
      Meteor.call('retrieveImageUrlById',context.props.trip.image_id,'backgrounds',(err,data)=>{
        if (err) {
          console.log(err);
          console.log('err retrieving image. This shouldn\'t happen. Doge time.');
          context._isMounted && context.setState({url:AbsUrl+'/group-beach.jpg'});
        }
        else {
          if (data && context._isMounted) context.setState({url:AbsUrl+data})
          else {
            if (count >= 15) {context._isMounted && context.setState({url:AbsUrl+'/group-beach.jpg'});}
            else {
              setTimeout(function(){
                count++;
                this.getImageUrl(context);
              },1000);
            }
            //No more than 15 tries. If someone puts in a stupid big image, they can wait/refresh the page.
          }
        }
      });
    };
    getThisImageUrl(this);
  },
  componentDidMount: function(){
    this._isMounted = true;
    if (this.props.trip.image_id) {
      this.getImageUrl()
    } else {
      this.setState({url:AbsUrl+'/group-beach.jpg'});
    }
  },
  navToTrip: function(){
    // document.location.href = '/trip/' + this.props.trip._id;
    this.props.history.push('/trip/'+ this.props.trip._id);
  },
  componentWillUnmount(){
    this._isMounted = false;
  },

  render: function(){
    var backgroundStyle = {'background': 'url('+this.state.url+')'};
    return (
      <div className="tripListContainer">
        <div className="tripListModule" onClick={this.navToTrip} style={backgroundStyle}>
          <h2 className="tripListText">{this.props.trip.name || 'Untitled Trip'}</h2>
          <h2 className="tripListDateText">{DateUtils.getTripDate(this.props.trip.dates)}</h2>
          <RemoveTrip trip={this.props.trip}/>
        </div>
      </div>
    );
  }
})
