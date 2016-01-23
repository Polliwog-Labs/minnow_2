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
    return this.props.ideas.map(function (idea, index) {
       return <IdeaEvent key={index} {...idea}/>
    })
  },

  render() {
    console.log(this.props.trip)
    return (
      <div className="list"> 
        {this.ideasList()}
      </div>
    )
  }

})