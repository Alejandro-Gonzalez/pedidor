import React from 'react'
import Select from 'react-select';

const Selector = ({ input, label, getOptions, meta: { error, submitFailed } }) => (
	<div>
		<label htmlFor="">{label}</label>
		<Select
			onChange={input.onChange}
			value={input.value}
			name="form-field-name"
			options={getOptions()}
		/>
		{submitFailed && error && <span className="app__form-error">{error}</span>}

	</div>
);

export default Selector;
