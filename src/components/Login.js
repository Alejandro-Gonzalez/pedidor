import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, setError } from '../redux/modules/auth';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.database = this.props.database;
		this.auth = this.props.auth;

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.submit = this.submit.bind(this);

		this.listeners();
	}
	
	listeners() {
		this.auth.onAuthStateChanged((user) => {
			if (user)
				this.props.onLogin(true);
		});
	}

	logout() {
		this.auth.signOut().then(() => {
			window.location.reload();
		}).catch((error) => {
			console.error("ERROR", error);
		});
	}

	login(password) {
		this.auth.signInWithEmailAndPassword('empanadas@fizzmod.com', password)
			.then(res => {
				this.props.onLogin(true);
			})
			.catch(err => {
				this.props.onSetError({ error: true, typeError: 'Password invalida' });
			})
	}

	submit(e) {
		e.preventDefault();

		if(!this.input.value)
			this.props.onSetError({ error: true, typeError: 'ingrese password' });
		else {
			this.props.onSetError({ error: false, typeError: '' });
			this.login(this.input.value);
		}
	}

	render() {
		const { isLoged } = this.props;
		return (
			<div className="app__auth-container">
				{
					!isLoged ? 
						<form onSubmit={this.submit}>
							<input type="password" ref={ipt => this.input = ipt } />
							{
								this.props.error &&
								<span>{this.props.typeError}</span>
							}
							<button>LOGIN</button>	
						</form>
						:
						<button className="app__auth-logout" onClick={this.logout}>SALIR</button>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { isLoged, error, typeError } = state.auth;
	return { isLoged, error, typeError };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onLogin: login,
		onSetError: setError
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
