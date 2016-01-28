IdeaLoader = React.createClass({

  ideasList(){
    var trip = this.props.trip;
    var that = this
    return this.props.ideas.map(function (idea, index) {
      return <IdeaEvent trip={trip} 
                        key={index} 
                        idea={idea} 
                        updateParent={that.props.updateParent} 
                        updateView={that.props.updateView}/>
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