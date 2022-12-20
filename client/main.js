import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { store } from './store';
import AppContainer from './App';

const render = (Component) => {
	ReactDom.hydrate(
		<Provider state={store}>
			<BrowserRouter>
				<Component />
			</BrowserRouter>
		</Provider>,
		document.getElementById('root'),
	);
};
render(AppContainer);
