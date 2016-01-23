Event = React.createClass({ 
  render() {
    return (
      <div className="item item-thumbnail-left anchor-resize">
        
          <img src={this.props.og.image}/>
          <h2>{this.props.name}</h2>
          <p>{this.props.desc}</p>
          <h3>{this.props.og.title}</h3>          
          <p>{this.props.og.description}</p>

      </div>
    )
  }
})