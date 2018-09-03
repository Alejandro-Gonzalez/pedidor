import React from 'react';
import ReactDOM from 'react-dom';
import create from './redux/create';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = create();

const config = {
	apiKey: "AIzaSyCWm5S_eGkPWct1G-5qRIQv9ROANUAKuDc",
	authDomain: "appp-3a783.firebaseapp.com",
	databaseURL: "https://appp-3a783.firebaseio.com",
	projectId: "appp-3a783",
	storageBucket: "appp-3a783.appspot.com",
	messagingSenderId: "363179653726"
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
