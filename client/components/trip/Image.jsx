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
      this.getImageURL(this.props.image_id);
    } else {
      this.setState({url:'/doge.jpg'});
    }
  },
  getImageURL: function(id){
    var count = 1;
    function getThisImageUrl(context){
      Meteor.call('retrieveImageUrlById',id,'images',(err,data)=>{
        if (err) {
          console.log(err);
          console.log('err retrieving image. This shouldn\'t happen');
          context.setState({url:'/doge.jpg'});
        }
        else {
          console.log(data);
          if (data) context.setState({url:data})
          else {
            if (count >= 15) {context.setState({url:'/doge.jpg'});}
            else {
              setTimeout(function(){
                count++;
                getThisImageUrl(context);
              },1500);
            }
            //No more than 15 tries. If someone puts in a stupid big image, they can wait/refresh the page.
          }
        }
      });
    };
    getThisImageUrl(this);
  },
  componentWillReceiveProps(newProps) {
    
    newProps && this.getImageURL(newProps.image_id);

  },
  render: function(){
    return <img src={this.state.url} height={this.props.height} />;
  }
});