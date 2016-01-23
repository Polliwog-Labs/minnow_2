AddIdeaModal = React.createClass({
  
  render: function () {
    return (
      <div className="list">
        <label className="item item-input item-stacked-label">
          <span className="input-label">Event Name</span>
          <input type="text" placeholder="example"/>
        </label>
        <label className="item item-input item-stacked-label">
          <span className="input-label">Description</span>
          <input type="text" placeholder="optional"/>
        </label>
        <label className="item item-input item-stacked-label">
          <span className="input-label">URL</span>
          <input type="text" placeholder="example"/>
        </label>
        <label className="item item-input item-stacked-label">
          <span className="input-label">Date</span>
          <input type="date" placeholder="example"/>
        </label>
      </div>
    )
  }
})

