import { combineReducers } from 'redux';
import GetHomeListingsReducer from './GetHomeListingsReducer.js';
import RegisterReducer from './RegisterReducer.js';
import LoginReducer from './LoginReducer.js';
import GetAuctionItemReducer from './GetAuctionItemReducer.js';
import BidReducer from './BidReducer.js';

const rootReducer = combineReducers({
	currentItems: GetHomeListingsReducer,
	register: RegisterReducer,
	login: LoginReducer,
	auctionItem: GetAuctionItemReducer,
	bid: BidReducer
})

export default rootReducer;