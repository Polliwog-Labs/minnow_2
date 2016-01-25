MemberLoader = React.createClass({
  
 
	populateMembers() {
		var trip = this.props.trip
		var members = this.props.members || this.state.memebers;
		console.log("members", members)
		members.map(function (user,index) {
			return (<MemberLoader key={index} trip={trip} {...user.username}/>)
		})
	},
  

  render() {
    return (

    	  <div>
			<ul className="list">
			  <li className="item item-toggle">
			        {this.populateMembers()}
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



