App = React.createClass({
  // mixins: [ReactMeteorData],


  logout: function() {
    Meteor.logout();
    document.location.href = '/login'
  },

  // getInitialState: function() {
  //     return {
  //       isAuth: Boolean(Meteor.userId())
  //     };
  // },

  
  render: function(){
    return (
      <div>
        <ReactBootstrap.Navbar>
          <ReactBootstrap.Navbar.Header>
            <ReactBootstrap.Navbar.Toggle />
            <ReactBootstrap.Navbar.Brand >
              minnow
            </ReactBootstrap.Navbar.Brand>
          </ReactBootstrap.Navbar.Header>
          <ReactBootstrap.Navbar.Collapse>
            <ReactBootstrap.Navbar.Text>
              Signed in as: <ReactBootstrap.Navbar.Link href="#">Mark Otto</ReactBootstrap.Navbar.Link>
            </ReactBootstrap.Navbar.Text>
            <ReactBootstrap.Navbar.Text >
              Have a great day!
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
      // <div className="ionic-body">
      //   <div className="bar bar-header bar-positive">
      //     { Meteor.userId() ?
      //       <i className="button button-icon icon ion-navicon-round nav-trigger"></i> : ''
      //     }
      //     <h1 className="h1 title">minnow</h1>
      //     <button className="button button-clear" onClick={this.logout}>Logout</button>
      //   </div>
      //   <div className="view">
      //     <div className="scroll-content ionic-scroll">
      //      <div className="content overflow-scroll has-header">
      //        { this.props.children }
      //      </div>
      //     </div>
      //   </div> 
      // </div>