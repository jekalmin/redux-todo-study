import React from 'react';
import { Provider } from 'react-redux';
import TodoApp from './App';
import { BrowserRouter } from 'react-router-dom';

const Root = ({ store }) => (
	<Provider store={store}>
		<BrowserRouter>
			<TodoApp />
		</BrowserRouter>
	</Provider>
);

export default Root;
