import { combineReducers } from 'redux';
import GetHomeListingsReducer from './GetHomeListingsReducer.js';
import RegisterReducer from './RegisterReducer.js'
import LoginReducer from './LoginReducer.js'

const rootReducer = combineReducers({
	currentItems: GetHomeListingsReducer,
	register: RegisterReducer,
	login: LoginReducer
})

export default rootReducer;