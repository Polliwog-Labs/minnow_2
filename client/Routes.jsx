const {Router, Route, Link, IndexRoute} = ReactRouter;

const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)()

// const Navigation = ReactRouter.Navigation; 

Meteor.startup(function() {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);

  ReactDOM.render((
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component = {Login} />
        <Route name="login" path="login" component={Login} />
        <Route name="signup" path="signup" component={Signup} />
        <Route name="myTrips" path="mytrips" component = {MyTrips} />
        <Route path="newevent" component = {Event} />
        <Route path="myinvites" component = {MyInvites} />
        <Route path='account' component = {Account} />
        <Route path="invites/:email" component = {MyInvites} />
        <Route path="/trip/:tripid" component = {Trip} >
          <Route name='tripHome' path="home" component = {TripHome} />
        </Route>
      </Route>
    </Router>
  ), root);
});