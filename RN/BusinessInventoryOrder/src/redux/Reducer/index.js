import { combineReducers } from "redux";
import * as UserReducer from "./User";
import * as OrderReducer from "./Order";
import * as ItemReducer from "./Item";
import * as CartReducer from "./Cart";
import * as CustomerReducer from "./Customer";
import * as UpdatesReducer from "./Updates";

const reducer = combineReducers(
	Object.assign(
		UserReducer,
		OrderReducer,
		ItemReducer,
		CartReducer,
		CustomerReducer,
		UpdatesReducer,
	),
);
export default reducer;
