Signup = React.createClass({
  // getInitialState(){
  //  return {};
  // },
  signup: function(event){
    event.preventDefault();
    var username = ReactDOM.findDOMNode(this.refs.username).value 
    var email = ReactDOM.findDOMNode(this.refs.email_input).value 
    var password = ReactDOM.findDOMNode(this.refs.password_input1).value  
    
    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: { myTrips: [] } 
    }, function(error) {
        if (error) {
          console.log(error)
        }else if(!error){
          document.location.href = "/mytrips";
        }
    });
  },

  render: function(){
    return(
      <div className="list col login-signup">
        <form>
          <h3>Sign up</h3>
          <input className="login-input" type="email" placeholder="Email" ref="email_input"/>
          <input className="login-input" type="text" placeholder="Full Name" ref="username"/>
          <input className="login-input" type="password" placeholder="Password" ref="password_input1"/>
          <input className="login-input" type="password" placeholder="Confirm Password" ref="password_input2"/>
          <button className="login-btn button button-block button-positive" type="button" onClick={this.signup}>Submit</button>
        </form>
        <ReactRouter.Link to="login">Aleady a user? Login.</ReactRouter.Link>
      </div>
    )
  }

})