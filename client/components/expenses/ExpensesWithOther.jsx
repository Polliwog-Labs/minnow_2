ExpensesWithOther = React.createClass({

	getInitialState:function(){
		return {
			show: true
		}
	},

	hideModal:function() {
	    this.setState({show: false});
	},

	showTransactions:function(){

	},

	render:function(){
	return (
		<ReactBootstrap.Modal
	      {...this.props}
	      show={this.state.show}
	      onHide={this.hideModal}
	      dialogClassName="custom-modal">
	      <ReactBootstrap.Modal.Header closeButton>
	        <ReactBootstrap.Modal.Title id="contained-modal-title-lg">All transactions between you and {this.props.key}</ReactBootstrap.Modal.Title>
	      </ReactBootstrap.Modal.Header>
	      <ReactBootstrap.Modal.Body>
	      <ul className="list">
	      	{this.state.show && this.showTransactions}
	      </ul>
	      </ReactBootstrap.Modal.Body>
	    </ReactBootstrap.Modal>
	  )
	}
})