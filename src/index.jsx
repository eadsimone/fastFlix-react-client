import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

class FastFlixApplication extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<MainView />
			</Provider>
		);
	}
}

// Finds root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(FastFlixApplication), container);
