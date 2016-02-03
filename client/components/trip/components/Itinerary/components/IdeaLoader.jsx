IdeaLoader = React.createClass({

  ideasList(){
    if (this.props.trip){
      var trip = this.props.trip;
      return trip.ideas.map((idea, index)=>{
        return <IdeaEvent trip={trip} 
                          key={index} 
                          idea={idea} 
                          updateParent={this.props.updateParent} 
                          updateView={this.props.updateView}/>
      })
    } else return <div/>;
  },

  render() {
    return (
      <div className="list"> 
        {this.ideasList()} 
      </div>
    )
  }

})