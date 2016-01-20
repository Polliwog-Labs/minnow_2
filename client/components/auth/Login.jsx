Login = React.createClass({
  
  getInitialState: function () {
    return {
      authError: ''
    }
  },

  userLogin(event){
    //wont trigger page refresh?
    event.preventDefault();
    //this function will grab the user's email and password from the "LOGIN input"
    var email = ReactDOM.findDOMNode(this.refs.email_input).value
    var password = ReactDOM.findDOMNode(this.refs.password_input).value
    //LoginWithPassword is a BUILT in function that comes with the "Accounts library we are using"
    var that = this;
    Meteor.loginWithPassword(email, password, function(err){
      console.log(email, password)
      if (err) {
        console.log('ERROR: ', err)
        that.setState({authError: 'Incorrect email or password'})
      } else {
        document.location.href = '/mytrips';
      }
    });
  }, 
  render(){
    if (Boolean(Meteor.userId())) {
      document.location.href = '/mytrips';
    }

    return (
      <div className="list col login-signup">
          <p className="auth-error">{this.state.authError}</p>
          <form onSubmit={this.userLogin}>
          <input className="login-input" type="email" placeholder='Email' ref='email_input'/>
          <input className="login-input" type="password" placeholder="Password" ref="password_input"/>
          <button type="submit" className="login-btn button button-block button-positive">
            Signin
          </button>
        </form>
        <ReactRouter.Link to="signup">Sign Up</ReactRouter.Link>
      </div>
    )
  }
})