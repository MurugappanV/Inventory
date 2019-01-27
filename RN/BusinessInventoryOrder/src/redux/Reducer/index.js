import { combineReducers } from "redux";
import * as UserReducer from "./User";
import * as OrderReducer from "./Order";

const reducer = combineReducers(Object.assign(UserReducer, OrderReducer));
export default reducer;
