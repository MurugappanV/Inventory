import { combineReducers } from "redux";
import * as HandleException from "./HandleException";
import * as User from "./User";

const reducer = combineReducers(Object.assign(HandleException, User));
export default reducer;
