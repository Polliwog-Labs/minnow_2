App = React.createClass({
  mixins: [ReactMeteorData],


  logout: function() {
    Meteor.logout();
    document.location.href = '/login'
  },

  getMeteorData: function() {
    var images = Meteor.subscribe('Images');
    var profiles = Meteor.subscribe('ProfilePics');
    return {};
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
              <ReactBootstrap.Navbar.Link href="/myinvites">My Invites</ReactBootstrap.Navbar.Link>
            </ReactBootstrap.Navbar.Text>

            <ReactBootstrap.Navbar.Text >
              Account
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text onClick={this.logout}>
              Logout
            </ReactBootstrap.Navbar.Text>
          </ReactBootstrap.Navbar.Collapse>
        </ReactBootstrap.Navbar>
        <div className="content">
          { this.props.children }
        </div>
      </div>
    )
  }
});