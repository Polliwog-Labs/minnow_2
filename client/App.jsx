App = React.createClass({
  mixins: [ReactMeteorData],


  logout: function() {
    this.navToggle();
    Meteor.logout();
    this.props.history.push('/');
  },

  getMeteorData: function() {
    var data = {notifications:[]};
    var images = Meteor.subscribe('Images');
    var profiles = Meteor.subscribe('ProfilePics');
    var notifications = Meteor.subscribe('Notifications');
    notifications.ready() && (data.notifications = Notifications.find({recipient:Meteor.userId()}).fetch())
    return data;
  },

  getInitialState: function () {
    return {
      expanded: false
    }
  },

  navToggle: function () {
    this.setState({expanded: !this.state.expanded})
  },
  
  render: function(){
    return (
      <div>
        <ReactBootstrap.Navbar expanded={this.state.expanded} onToggle={this.navToggle}>
          <ReactBootstrap.Navbar.Header>
            { Meteor.userId() ?
              <ReactBootstrap.Navbar.Toggle /> : ''
            }
            <ReactBootstrap.Navbar.Brand >
              minnow
            </ReactBootstrap.Navbar.Brand>
          </ReactBootstrap.Navbar.Header>
          <ReactBootstrap.Navbar.Collapse>
            <ReactBootstrap.Navbar.Text>
            <ReactRouter.Link to="mytrips" className='menu-link' onClick={this.navToggle} >My Trips</ReactRouter.Link>
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text>
            <ReactRouter.Link to="myinvites" className='menu-link' onClick={this.navToggle} >My Invites ({this.data.notifications.length})</ReactRouter.Link>
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text >
            <ReactRouter.Link to="account" className='menu-link' onClick={this.navToggle} >Account</ReactRouter.Link>
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text onClick={this.logout}>
              Logout
            </ReactBootstrap.Navbar.Text>
          </ReactBootstrap.Navbar.Collapse>
        </ReactBootstrap.Navbar>
        <div ref='app' className="content">
          { this.props.children }
        </div>
      </div>
    )
  }
});
