IdeaLoader = React.createClass({

  ideasList(){
    var trip = this.props.trip;
    return this.props.ideas.map((idea, index)=>{
      return <IdeaEvent trip={trip} 
                        key={index} 
                        idea={idea} 
                        updateParent={this.props.updateParent} 
                        updateView={this.props.updateView}/>
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