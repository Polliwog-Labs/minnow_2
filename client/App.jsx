App = React.createClass({
  mixins: [ReactMeteorData],


  logout: function() {
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

  
  render: function(){
    return (
      <div>
        <ReactBootstrap.Navbar>
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
              <ReactBootstrap.Navbar.Link href="/mytrips">My Trips</ReactBootstrap.Navbar.Link> 
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text>
              <ReactBootstrap.Navbar.Link href="/myinvites">My Invites ({this.data.notifications.length})</ReactBootstrap.Navbar.Link>
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text >
              <ReactBootstrap.Navbar.Link href="/account">Account</ReactBootstrap.Navbar.Link>
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