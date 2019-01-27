import Types from "../Types";
import createReducer from "./CreateReducer";

export const orders = createReducer(null, {
	[Types.order.SET_ORDERS](state, action) {
		return action.data.orders;
	},
	[Types.order.CLEAR_ORDERS]() {
		return null;
	},
});
