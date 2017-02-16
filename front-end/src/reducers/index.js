import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer.js';
import GetHomeReducer from './GetHomeReducer.js';
import RegisterReducer from './RegisterReducer.js'

const rootReducer = combineReducers({
	search: SearchReducer,
	home: GetHomeReducer,
	register: RegisterReducer
})

export default rootReducer;