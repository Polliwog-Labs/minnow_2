AddIdeaModal = React.createClass({
  
  render: function () {
    return (
      <div className="list">
        <label className="item item-input item-stacked-label">
          <span className="input-label">First Name</span>
          <input type="text" placeholder="John"/>
        </label>
        <label className="item item-input item-stacked-label">
          <span className="input-label">Last Name</span>
          <input type="text" placeholder="Suhr"/>
        </label>
        <label className="item item-input item-stacked-label">
          <span className="input-label">Email</span>
          <input type="text" placeholder="john@suhr.com"/>
        </label>
      </div>
    )
  }
})

