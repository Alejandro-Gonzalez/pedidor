
const initialState = {
	isLoged: false,
	error: false,
	typeError: ''
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case 'IS_LOGED':
			return {
				...state,
				isLoged: action.isLoged
			};
		case 'SET_ERROR':
			return {
				...state,
				...action.dataError
			};
		default:
			return state;
	}
};

export const login = isLoged => ({
	type: 'IS_LOGED',
	isLoged
});

export const setError = data => ({
	type: 'SET_ERROR',
	dataError: { ...data }
})