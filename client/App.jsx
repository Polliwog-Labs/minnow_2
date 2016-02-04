App = React.createClass({
  mixins: [ReactMeteorData],


  logout: function() {
    this.navToggle();
    Meteor.logout();
    $('body').css({'background': 'url("/travelling-alone.jpg")', "background-size": "cover", "background-repeat": "no-repeat"});
    var history = this.props.history
    setTimeout(function() {
      history.push('/login');
    }, 200)
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
        { Meteor.userId() ?
          <ReactBootstrap.Navbar className="nav-override" expanded={this.state.expanded} onToggle={this.navToggle}>
            <ReactBootstrap.Navbar.Header>
                <ReactBootstrap.Navbar.Toggle /> 
              <ReactBootstrap.Navbar.Brand className="nav-override">
                minnow
              </ReactBootstrap.Navbar.Brand>
            </ReactBootstrap.Navbar.Header>
            <ReactBootstrap.Navbar.Collapse >
              <ReactBootstrap.Navbar.Text>
              <ReactRouter.Link to="mytrips" className='nav-override menu-link' onClick={this.navToggle} >My Trips</ReactRouter.Link>
              </ReactBootstrap.Navbar.Text>
              <ReactBootstrap.Navbar.Text>
              <ReactRouter.Link to="myinvites" className='nav-override menu-link' onClick={this.navToggle} >My Invites ({this.data.notifications.length})</ReactRouter.Link>
              </ReactBootstrap.Navbar.Text>
              <ReactBootstrap.Navbar.Text>
              <ReactRouter.Link to="account" className='nav-override menu-link' onClick={this.navToggle} >Account</ReactRouter.Link>
              </ReactBootstrap.Navbar.Text>
              <ReactBootstrap.Navbar.Text className="nav-override" onClick={this.logout}>
                Logout
              </ReactBootstrap.Navbar.Text>
            </ReactBootstrap.Navbar.Collapse>
          </ReactBootstrap.Navbar> : ''
        }
        <div ref='app' className="content">
          { this.props.children }
        </div>
      </div>
    )
  }
});
