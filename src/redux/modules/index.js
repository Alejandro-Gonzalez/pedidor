import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import order from './order';
import auth from './auth';

export default combineReducers({
	form,
	order,
	auth
});
