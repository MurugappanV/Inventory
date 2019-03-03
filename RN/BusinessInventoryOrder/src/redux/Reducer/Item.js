import Types from "../Types";
import createReducer from "./CreateReducer";

export const items = createReducer([], {
	[Types.item.SET_ITEMS](state, action) {
		return action.data.items;
	},
	[Types.item.CLEAR_ITEMS]() {
		return [];
	},
});
