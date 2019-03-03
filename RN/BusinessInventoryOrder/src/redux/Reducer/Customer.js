import Types from "../Types";
import createReducer from "./CreateReducer";

export const customers = createReducer([], {
	[Types.customer.SET_CUSTOMERS](state, action) {
		return action.data.items;
	},
	[Types.customer.CLEAR_CUSTOMERS]() {
		return [];
	},
});
