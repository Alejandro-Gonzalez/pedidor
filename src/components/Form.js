import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { loadAccount } from '../redux/modules/order';
import Selector from './Selector';

export const isRequired = value => {
	return value ? undefined : 'Este campo es obligatorio.'
};

export const numberValid = value => {
	return Number(value) > 0 ? undefined : 'Ingrese cantidad valida'
};

const renderField = ({ input, defaultValue, label, type, meta: { touched, error } }) => (
	<div>
		<label>{label}</label>
		<div>
			<input
				{...input}
				value={input.value}
				type={type}
				placeholder={label}
			/>
			{touched && error && <span>{error}</span>}
		</div>
	</div>
);

const renderMembers = ({ fields, getOptions, meta: { error, submitFailed } }) => (
	<div className="app__form-wrapper">
		
		{submitFailed && error && <span>{error}</span>}
		<ul>
			{
				fields.map((member, index, data) => (
					<li key={index} className="app__form-type">
						<Field
							name={`${member}.quantity`}
							type="number"
							component={renderField}
							validate={[isRequired, numberValid]}
							label="Cantidad"
						/>
						<Field
							name={`${member}.type`}
							component={Selector}
							validate={isRequired}
							getOptions={() => getOptions(data.get(index))}
							label="Gusto"
						/>
						<button
							type="button"
							title="Remove Member"
							onClick={() => fields.remove(index)}
						>
							REMOVER
						</button>
					</li>
				))
			}
		</ul>
		<button type="button" className="app__form-add" onClick={() => fields.push({ quantity: 1 })}>
			Agregar Gusto
		</button>
	</div>
);

let Form = props => {
	const { handleSubmit, submitting, getOptions, loadAccount } = props
	return (
		<form onSubmit={handleSubmit} className="app__form-container">
			
			<Field
				name="name"
				type="text"
				component={renderField}
				validate={isRequired}
				label="Quien pide"
			/>
			<FieldArray
				name="types"
				component={renderMembers}
				validate={isRequired}
				getOptions={getOptions}
			/>
			<div className="app__form-actions">
				<button type="submit" disabled={submitting}>
					Enviar orden
				</button>
				<button
					type="button"
					onClick={() => loadAccount({})}
				>
					Limpiar
				</button>
			</div>
		</form>
	)
};

Form = reduxForm({
	form: 'form',
	enableReinitialize: true
})(Form);

const mapStateToProps = ({ order }) => ({
	initialValues:	order.data
})

const mapDispatchToProps = {
	loadAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
