import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './modules';

let middlewares;

if (process.env.NODE_ENV === 'production') middlewares = applyMiddleware(thunk);
else middlewares = applyMiddleware(thunk, createLogger());

function create(initialState) {
	// const store = createStore(rootReducer, initialState, middlewares);
	const finalCreateStore = compose(
		middlewares,
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)(createStore);

	const store = finalCreateStore(rootReducer, initialState);

	return store;
}

export default create;
