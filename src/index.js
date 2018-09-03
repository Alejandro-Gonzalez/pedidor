import React from 'react';
import ReactDOM from 'react-dom';
import create from './redux/create';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = create();

var config = {
	apiKey: 'XXXXXXXXXXXXXXXXXXXXXXX',
	authDomain: 'XXXXXXXXXXX.firebaseapp.com',
	databaseURL: 'https://XXXXXXXXXX.firebaseio.com',
	projectId: 'XXXXXXXXXX',
	storageBucket: 'XXXXXXXXXX.appspot.com',
	messagingSenderId: 'XXXXXXXXXX'
};

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();

const AppConnected = () => (
	<Provider store={store}>
		<App database={database} auth={auth}/>
	</Provider>
);

ReactDOM.render(<AppConnected />, document.getElementById('root'));

registerServiceWorker();
