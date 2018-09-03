import { reset } from 'redux-form';

const LOAD = 'redux-form/LOAD';

const reducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			return {
				data: action.data
			}
		default:
			return state
	}
}

export const loadAccount = data => (dispatch) => {
	dispatch(reset('form'));
	dispatch({ type: LOAD, data });
};

export default reducer