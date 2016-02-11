VenmoButton = React.createClass({

  launchVenmo() { //opens venmo within app
    window.open("http://venmo.com", '_system')
  },

  render() {
    return (
      <img className='venmo-button' onClick={this.launchVenmo} src={AbsUrl + '/venmo-icon.png'} width='30' height='30' />
    )
  }
})