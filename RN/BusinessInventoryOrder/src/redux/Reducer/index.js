import { combineReducers } from "redux";
import * as User from "./User";

const reducer = combineReducers(Object.assign(User));
export default reducer;
