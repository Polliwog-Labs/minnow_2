TripList = React.createClass({
  propTypes: {
    trip: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {url:'/doge.jpg'}
  },
  componentDidMount: function(){
    var that = this;
    var count = 1;
    var getImageURL = function(context){
      Meteor.call('retrieveImageUrlById',that.props.trip.image_id,'backgrounds',(err,data)=>{
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
                getImageURL(context);
              },1000);
            }
            //No more than 15 tries. If someone puts in a stupid big image, they can wait/refresh the page.
          }
        }
      });
    };
    if (this.props.trip.image_id) {
      getImageURL(that);
    } else {
      console.log('this.props.image_id is undefined. This shouldn\'t happen.');
      this.setState({url:'/doge.jpg'});
    }
  },
  navToTrip: function(){
    document.location.href = '/trip/' + this.props.trip._id;
  },

  render: function(){
    var params = {
      _id: null,
      name: 'Unnamed Trip',
      dates: [0,0],
      members: [],
      ideas: [],
      itinerary: [],
      messages: [],
      expenses: [],
      todo: [],
      organizer: [],
    };
    
    for (var key in this.props.trip){
      this.props.trip[key] && (params[key] = this.props.trip[key]);
    }

    var backgroundStyle = {
     'background': 'url('+this.state.url+')',
    }

    return (
      <div className="tripListModule" onClick={this.navToTrip} style={this.state.url.length ? backgroundStyle : {}}>
          <h2 className="tripListText">{params.name}</h2>
          <h2 className="tripListDateText" >October 31st</h2>
      </div>
    );
  }
})
