Signup = React.createClass({
  getInitialState: function () {
    return {
      isAuth: Boolean(Meteor.userId()),
      signupError: ''
    }
  },

  signup: function(event){
    event.preventDefault();
    var username = ReactDOM.findDOMNode(this.refs.username).value 
    var email = ReactDOM.findDOMNode(this.refs.email_input).value 
    var password = ReactDOM.findDOMNode(this.refs.password_input1).value  
    var that = this;

    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: { myTrips: [], invites:[] } ,
    }, function(error) {
        if (error) {
          console.log(error)
          that.setState({signupError: error.reason})
        }else if(!error){
          document.location.href = "/mytrips";
        }
    });
  },

  render: function(){
    if (this.state.isAuth) {
      document.location.href = '/mytrips';
    }

    return(
      <div className="list col login-signup">
        <p className="auth-error">{this.state.signupError}</p>
        <form>
          <input className="login-input" type="email" placeholder="Email" ref="email_input"/>
          <input className="login-input" type="text" placeholder="Full Name" ref="username"/>
          <input className="login-input" type="password" placeholder="Password" ref="password_input1"/>
          <input className="login-input" type="password" placeholder="Confirm Password" ref="password_input2"/>
          <button className="login-btn button button-block button-positive" type="button" onClick={this.signup}>Create Account</button>
        </form>
        <ReactRouter.Link to="login">Aleady a user? Login here.</ReactRouter.Link>
      </div>
    )
  }

})