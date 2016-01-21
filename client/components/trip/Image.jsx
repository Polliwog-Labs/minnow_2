Image = new React.createClass({
  propTypes: {
    image_id: React.PropTypes.string,
    height: React.PropTypes.string
  },
  getInitialState: function(){
    return {url:'/doge.jpg'}
  },
  componentDidMount: function(){
    if (this.props.image_id) {
      this.getImageURL();
    } else {
      console.log('this.props.image_id is undefined. This shouldn\'t happen.');
      this.setState({url:'/doge.jpg'});
    }
  },
  getImageURL: function(){
    var that = this;
    var count = 1;
    Meteor.call('retrieveImageUrlById',that.props.image_id,(err,data)=>{
      if (err) {
        console.log(err);
        console.log('err retrieving image. This shouldn\'t happen');
        that.setState({url:'/doge.jpg'});
      }
      else {
        if (data) that.setState({url:data})
        else {
          if (count >= 15) {that.setState({url:'/doge.jpg'});}
          else {
            setTimeout(function(){
              count++;
              that.getImageURL();
            },1000);
          }
          //No more than 15 tries. If someone puts in a stupid big image, they can wait/refresh the page.
        }
      }
    });
  },
  componentWillReceiveProps() {
    this.getImageURL();
  },
  render: function(){
    return (
            <img src={this.state.url} height={this.props.height} />
            );
  }
});