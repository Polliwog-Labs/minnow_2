SplitModal = React.createClass({

	render:function(){
		return(
	<div>
		<ul className="list">
		  <li className="item item-toggle">
		     Joey
		     <label className="toggle toggle-balanced">
		       <input type="checkbox" />
		       <div className="track">
		         <div className="handle" />
		       </div>
		     </label>
		  </li>
		  <li className="item item-toggle">
		     Daniel
		     <label className="toggle toggle-balanced">
		       <input type="checkbox" />
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



