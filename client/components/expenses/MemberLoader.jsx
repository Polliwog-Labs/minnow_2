MemberLoader = React.createClass({
  

  render() {

    return (
    	  <div>
			<ul className="list">
			  <li className="item item-toggle">
			        {this.props.member.username}
				     <label className="toggle toggle-balanced">
				       <input type="checkbox" onChange={this.change}/>
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



