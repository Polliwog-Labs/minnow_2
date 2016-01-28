MemberLoader = React.createClass({
  

 

  render() {
  	console.log("member loader level", this.props)

    return (
    	  <div>
			<ul className="list">
			  <li className="item item-toggle">
			        {this.props.member.username}
				     <label className="toggle toggle-balanced">
				       <input type="checkbox" ref= {this.props.index} onClick={this.props.onToggle(this, event)} onChange={this.change}/>
			     	       <div className="track">
					         <div className="handle" />
						       </div>
					    </label>
				    </li>
				</ul>
		   </div>
  		)
	}
})



