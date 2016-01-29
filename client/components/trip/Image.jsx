Image = new React.createClass({
  _isMounted:false,
  propTypes: {
    image_id: React.PropTypes.string,
    height: React.PropTypes.string,
  },
  getInitialState: function(){
    return {url:'/loading.gif'}
  },
  componentDidMount: function(){
    this._isMounted = true;
    if (this.props.image_id) {
      this.getImageURL(this.props.image_id);
    } 
  },
  getImageURL: function(id){
    var meteorCall = this.props.profile ? 'retrieveProfilePic' : 'retrieveImageUrlById';
    var count = 1;
    function getThisImageUrl(context){
      Meteor.call(meteorCall,id,'images',(err,data)=>{
        if (err && context._isMounted) {
          console.log(err);
          console.log('Bad Image ID');
          context.setState({url:'/doge.jpg'});
        }
        else {
          if (data && context._isMounted) context.setState({url:data})
          else {
            if (count >= 15 && context._isMounted) {context.setState({url:'/doge.jpg'});}
            else {
              window['timeout'+count] = setTimeout(function(){
                count++;
                getThisImageUrl(context);
              },1000);
            }
            //No more than 15 tries. If someone puts in a stupid big image, they can wait/refresh the page.
          }
        }
      });
    };
    getThisImageUrl(this);
  },
  componentWillReceiveProps(newProps) {
    newProps && newProps.image_id && this.getImageURL(newProps.image_id);
  },
  componentWillUnmount(){
    this._isMounted=false;
    for (var i=1;i<16;i++){
      clearTimeout(window['timeout'+i]);
    }
  },
  render: function(){
    return <img className={this.props.ionicClass} src={this.state.url} width={this.props.width} height={this.props.height} />;
  }
});