Login = React.createClass({

  // mixins:[ReactRouter.History],
  
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
    Meteor.loginWithPassword(email, password, err=>{
      if (err) {
        console.log('ERROR: ', err)
        this.setState({authError: 'Incorrect email or password'})
      } else {
        this.props.history.push('/mytrips');
      }
    });
  }, 
  componentDidMount(){
    Meteor.user() && this.props.history.push('/mytrips');
  },
  render(){
    return (
      <div className="list col login-signup">
        <form onSubmit={this.userLogin}>
          <h3 className="dark-blue-text">Login</h3>
          <p className="auth-error">{this.state.authError}</p>
          <div className="clean"></div>
          <input className="login-input" type="email" placeholder='Email' ref='email_input'/>
          <div className="clear"></div>
          <input className="login-input" type="password" placeholder="Password" ref="password_input"/>
          <button type="submit" className="login-btn button button-block button-positive">
            Signin
          </button>
        </form>
        <ReactRouter.Link to="signup">Don't have an account? Sign up!</ReactRouter.Link>
      </div>
    )
  }
})