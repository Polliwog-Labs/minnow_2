Itinerary = React.createClass({
  


  render: function () {
    console.log('itinerary props: ', this.props )
    return (
      <div>
        <div className="segmented-control col">
          <a className="control-item active" >
            Itinerary
          </a>
          <a className="control-item">
            Ideas
          </a>
        </div>
      </div>
    )
  }
})