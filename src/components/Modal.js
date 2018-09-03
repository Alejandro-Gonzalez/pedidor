import React from 'react';
import Modal from 'react-responsive-modal';

export default class App extends React.Component {
	state = {
		open: false,
	};

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	render() {
		const { open } = this.state;
		return (
			<div className="app__modal-container">
				<button onClick={this.onOpenModal}>Ver Gustos</button>
				<Modal open={open} onClose={this.onCloseModal} center>
					<img src="http://www.lafachada.com.ar/images/popup_empanadas.jpg"/>
				</Modal>
			</div>
		);
	}
}

