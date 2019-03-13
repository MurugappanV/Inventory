import Types from "../Types";
import createReducer from "./CreateReducer";

export const users = createReducer([], {
	[Types.users.SET_USERS](state, action) {
		return action.data.items;
	},
	[Types.users.CLEAR_USERS]() {
		return [];
	},
});