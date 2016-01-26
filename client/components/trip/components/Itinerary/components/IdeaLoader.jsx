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
       return <IdeaEvent trip={trip} key={index} idea={idea}/>
    })

  },

  render() {
    return (
      <div className="list"> 
        {this.ideasList()} 
      </div>
    )
  }

})