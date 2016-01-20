Image = new React.createClass({
  propTypes: {
    image_id: React.PropTypes.string,
    height: React.PropTypes.string
  },
  getInitialState: function(){
    return {url:'/doge.jpg'}
  },
  componentDidMount: function(){
    var that = this;
    var count = 1;
    var getImageURL = function(context){
      Meteor.call('retrieveImageUrlById',that.props.image_id,(err,data)=>{
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
    if (this.props.image_id) {
      getImageURL(that);
    } else {
      console.log('this.props.image_id is undefined. This shouldn\'t happen.');
      this.setState({url:'/doge.jpg'});
    }
  },
  render: function(){
    return (
            <img src={this.state.url} height={this.props.height} />
            );
  }
});