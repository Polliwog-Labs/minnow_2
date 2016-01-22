TripList = React.createClass({
  propTypes: {
    trip: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {url:'/doge.jpg'}
  },
  getImageUrl(){
    var count = 1;
    function getThisImageUrl(context){
      Meteor.call('retrieveImageUrlById',context.props.trip.image_id,'backgrounds',(err,data)=>{
        if (err) {
          console.log(err);
          console.log('err retrieving image. This shouldn\'t happen');
          context.setState({url:'/doge.jpg'});
        }
        else {
          if (data) context.setState({url:data})
          else {
            if (count >= 15) {context.setState({url:'/doge.jpg'});}
            else {
              setTimeout(function(){
                count++;
                getImageUrl(context);
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
    if (this.props.trip.image_id) {
      this.getImageUrl()
    } else {
      console.log('this.props.image_id is undefined. This shouldn\'t happen.');
      this.setState({url:'/doge.jpg'});
    }
  },
  navToTrip: function(){
    document.location.href = '/trip/' + this.props.trip._id;
  },

  render: function(){

    var backgroundStyle = {'background': 'url('+this.state.url+')'};
    var tripStart = this.props.trip.dates ? (this.props.trip.dates[0] || 'October 32nd') : 'October 32nd';

    return (
      <div className="tripListModule" onClick={this.navToTrip} style={backgroundStyle}>
          <h2 className="tripListText">{this.props.trip.name || 'Unnamed Trip'}</h2>
          <h2 className="tripListDateText" >{tripStart}</h2>
      </div>
    );
  }
})
