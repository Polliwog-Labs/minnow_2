VenmoButton = React.createClass({

  launchVenmo() {
    navigator.startApp.start("venmo://", function(message) { /* success */
      console.log(message); // => OK
    }, 
    function(error) { /* error */
        console.log(error);
    });
  },

  launchVenmo() {
    window.open("http://venmo.com", '_system')
  },

  render() {
    return (
      <img className='venmo-button' onClick={this.launchVenmo} src={AbsUrl + '/venmo-icon.png'} width='20' height='20' />
    )
  }
})