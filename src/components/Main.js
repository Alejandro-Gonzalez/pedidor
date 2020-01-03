import React, { Fragment } from 'react';
import Form from './Form';
import { loadAccount } from '../redux/modules/order';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Modal from './Modal';

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			types: [],
			orders: [],
			orderTypes: [],
			pricePerUnit: 0
		};

		this.database = this.props.database;

		this.typesRef = this.database.ref('types/');
		this.ordersRef = this.database.ref('orders/');
		this.priceRef = this.database.ref('price/');
		this.listeners();

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.getOptions= this.getOptions.bind(this);
		this.submit = this.submit.bind(this);
		this.updateOrder = this.updateOrder.bind(this);
		this.deleteOrder = this.deleteOrder.bind(this);
	}

	objToArrayObj(obj) {
		if(!obj)
			return [];
		return Object.keys(obj).reduce((accum, key) => {
			const accumulator = [...accum];
			const copy = obj[key];
			copy.uid = key;
			accumulator.push(copy);
			return accumulator;
		}, []);
	}

	listeners() {
		this.typesRef.on('value', (snapshot) => {
			this.setState({ types: this.objToArrayObj(snapshot.val()) });
		});

		this.ordersRef.on('value', (snapshot) => {
			this.setState({ orders: this.objToArrayObj(snapshot.val()) });
		});

		this.priceRef.on('value', (snapshot) => {
			this.setState({ pricePerUnit: snapshot.val() });
		});
	}

	handleClick() {
		this.setState(prevState => ({
			modalActive: !prevState.modalActive
		}));
	}

	formClear() {
		this.props.reset('form');
	}

	setType(data){
		this.typesRef.push(data);
	}

	setOrder(data){
		this.ordersRef.push(data);
		this.formClear();
	}

	deleteOrder({ uid }) {
		this.database.ref(`orders/${uid}`).remove();
	}

	updateOrder(data) {
		const newData = { ...data };
		this.database.ref('orders/' + data.uid).update(newData).then(() => {
			this.props.loadAccount({});
		});
	}

	editOrder(data) {
		this.props.loadAccount(data);
	}

	submit(data) {
		if('uid' in data)
			return this.updateOrder(data);
		this.setOrder(data);
	}

	handleChange(value) {
		this.setState({ selectedOption: value })
	}

	getOptions() {
		const { types } = this.state;
		return types.map(({id, name}) => ({
			label: name,
			value: id
		}));
	}

	setPricePerUnit(e) {
		console.log(e.target)
	}

	getAllTypes() {
		let all = this.state.orders.reduce((accum, order) => {
			const accumulator = [...accum, ...order.types]
			return accumulator;
		}, []);

		all = all.reduce((accum, typeObj) => {
			let accumulator = [...accum];

			if(!accumulator.some(type => type.id === typeObj.type.value)) {
				accumulator.push({
					quantity:  Number(typeObj.quantity),
					name: typeObj.type.label,
					id: typeObj.type.value
				});
			} else {
				const currentItem = accumulator.find(type => type.id === typeObj.type.value);
				accumulator = [...accumulator.filter(type => type.id !== typeObj.type.value), {
					quantity: currentItem.quantity + Number(typeObj.quantity),
					name: typeObj.type.label,
					id: typeObj.type.value
				}];
			}
			return accumulator;
		}, [])
		return all;
	}

	render() {
		const { pricePerUnit } = this.state;
		const all = this.getAllTypes();
		const quantity = all.reduce((accum, order) => {
			return order.quantity + accum;
		}, 0);

		return (
			<div className="app__container">
				<div>
					<marquee behavior="scroll" direction="right">
						<img className="main__logo" src="https://media1.tenor.com/images/0a853c5f0f2216fad17fb4178a3dd3e2/tenor.gif?itemid=11559489" />
					</marquee>
				</div>
				<Form
					getOptions={this.getOptions}
					onSubmit={this.submit}
				/>
				<div className="main__container">
					<div className="main__orders">
					{
						this.state.orders.length ?
							<h4>PEDIDOS</h4>
							:
							''
					}
					{
						this.state.orders.map((data) => (
							<div className="main__order">
								<p>De: {data.name}</p>
								<strong>Gustos</strong>
								<ul>
									{
										data.types.map(({ type, quantity }) => (
											<li key={type.label}>
												{quantity}  {type.label}
											</li>
										))
									}
								</ul>
								<p>
									<strong>
									Subtotal:
									</strong> $
									{
										data.types.reduce((accum, { quantity }) => (
											accum += Number(quantity)
										), 0) * pricePerUnit
									}
								</p>
								<div className="main__order-actions">
									<button
										className="remove"
										onClick={() => this.deleteOrder(data)}
									>
										ELIMINAR
									</button>
									<button
										className="edit"
										onClick={() => this.editOrder(data)}
									>
										EDITAR
									</button>
								</div>
							</div>
						))
					}
					</div>
					<div className="main__total">
						{
								all.length ?
									<h4>TOTAL</h4>
									:
									''
						}
						<ul>
							{
								all.map(order => (
									<li>
										<strong>{order.quantity}</strong> - {order.name}
									</li>
								))
							}
							{
								quantity ?
								<Fragment>
										<br />
										<hr />
										<li>{quantity} empanadas</li>
										<li>Precio final,   <strong> $ {quantity * pricePerUnit}</strong></li>
									</Fragment>
								:
									null
							}
						</ul>
					</div>
				</div>
				<Modal />
			</div>
		);
	}
}


const mapDispatchToProps = {
	loadAccount,
	reset
};

export default connect(null, mapDispatchToProps)(Main);
