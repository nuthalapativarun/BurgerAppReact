import React, { Component, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => import('./Containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./Containers/Orders/Orders'));
const Auth = React.lazy(() => import('./Containers/Auth/Auth'));

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" render={() => <Suspense fallback={<div>Loading...</div>}><Auth/></Suspense>} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" render={() => <Suspense fallback={<div>Loading...</div>}><Checkout/></Suspense>} />
          <Route path="/orders" render={() => <Suspense fallback={<div>Loading...</div>}><Orders/></Suspense>} />
          <Route path="/auth" render={() => <Suspense fallback={<div>Loading...</div>}><Auth/></Suspense>} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div >
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
