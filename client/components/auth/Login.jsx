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
    console.log(password);
    Meteor.loginWithPassword(email, password, err=>{
      if (err) {
        console.log('ERROR: ', err)
        this.setState({authError: 'Incorrect email or password'})
      } else {
        document.location.href = '/mytrips';
      }
    });
  }, 
  componentDidMount(){
    setTimeout(()=>{
      Meteor.user() && (document.location.href = '/mytrips');
    },1000);
  },
  render(){
    return (
      <div className="list col login-signup">
          <p className="auth-error">{this.state.authError}</p>
          <form>
          <input className="login-input" type="email" placeholder='Email' ref='email_input'/>
          <input className="login-input" type="password" placeholder="Password" ref="password_input"/>
          <button type="submit" className="login-btn button button-block button-positive" onClick={this.userLogin}>
            Signin
          </button>
        </form>
        <ReactRouter.Link to="signup">Don't have an account? Sign up!</ReactRouter.Link>
      </div>
    )
  }
})