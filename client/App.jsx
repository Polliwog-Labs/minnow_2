App = React.createClass({
  // mixins: [ReactMeteorData],
  getInitialState: function() {
      return {};
  },

  logout: function() {
    Meteor.logout();
    document.location.href = '/login'
  },

  
  render: function(){
    return (
      <div className="ionic-body">
        <div className="bar bar-header bar-positive">
          { Meteor.userId() ?
            <i className="button button-icon icon ion-navicon-round nav-trigger"></i> : ''
          }
          <h1 className="h1 title">minnow</h1>
          <button className="button button-clear" onClick={this.logout}>Logout</button>
        </div>
        <div className="view">
          <div className="scroll-content ionic-scroll">
            <div className="content overflow-scroll has-header">
              { this.props.children }
            </div>
          </div>
        </div> 
      </div>
    )
  }
});