import React from 'react';
import { Provider } from 'react-redux';
import TodoApp from './App';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const Root = ({ store }) => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path='/:filter' component={TodoApp}/>
				<Redirect from="/" to="/all"/>
			</Switch>
		</Router>
	</Provider>
);
export default Root;
