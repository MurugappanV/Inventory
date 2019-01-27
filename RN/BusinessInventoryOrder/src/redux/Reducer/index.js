import { combineReducers } from "redux";
import * as UserReducer from "./User";
import * as OrderReducer from "./Order";
import * as ItemReducer from "./Item";

const reducer = combineReducers(Object.assign(UserReducer, OrderReducer, ItemReducer));
export default reducer;
