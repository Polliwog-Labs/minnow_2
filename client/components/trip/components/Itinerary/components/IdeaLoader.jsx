IdeaLoader = React.createClass({
  // propTypes: {
  //   ideas: React.PropTypes.array.isRequired
  // },

  // getInitialState(){
  //   return({ideas:null});
  // },

  // componentWillReceiveProps(newProps){
  //   this.setState({ideas:newProps.ideas});
  // },

  ideasList(){
    return this.props.ideas.map(function(idea, index){
      return <Event key={index} {...idea} />
    });
  },

  render() {
    return (
      <div className="list"> 

        {this.ideasList()} 

      </div>
    )
  }

})