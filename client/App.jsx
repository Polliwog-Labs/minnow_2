App = React.createClass({
  // mixins: [ReactMeteorData],
  // getInitialState: function() {
  //     return {
  //       isAuth: Boolean(Meteor.userId())
  //     };
  // },
  
  render: function(){
    return (
      <div className="ionic-body">
        <div className="bar bar-header bar-positive">
          { Meteor.userId() ?
            <i className="button button-icon icon ion-navicon-round nav-trigger"></i> : ''
          }
          <h1 className="h1 title">minnow</h1>
        </div>
        <div className="view">
          <div className="scroll-content ionic-scroll">
            <div className="content overflow-scroll has-header has-footer">
              { this.props.children }
            </div>
          </div>
        </div> 
      </div>
    )
  }
});