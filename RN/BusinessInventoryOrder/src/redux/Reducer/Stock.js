import Types from "../Types";
import createReducer from "./CreateReducer";

export const stocks = createReducer(null, {
	[Types.stock.SET_STOCKS](state, action) {
		return action.data.stocks;
	},
	[Types.stock.CLEAR_STOCKS]() {
		return null;
	},
});
