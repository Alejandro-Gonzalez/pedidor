import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import './App.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, setError } from './redux/modules/auth';
import Login from './components/Login';
import Main from './components/Main';

const App = ({ isLoged, database, auth }) => (
	<div>
		<Login auth={auth} />
		<br/>
		{isLoged && <Main database={database} />}
	</div>
);

function mapStateToProps(state) {
	const { isLoged } = state.auth;
	return { isLoged };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onLogin: login,
		onSetError: setError
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
