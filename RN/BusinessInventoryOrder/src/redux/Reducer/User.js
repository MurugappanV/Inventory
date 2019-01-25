import Types from "../Types";
import createReducer from "./CreateReducer";

const initialUserCredentials = {
	token: null,
	userId: null,
};

export const userCredentials = createReducer(initialUserCredentials, {
	[Types.user.SET_USER_ID](state, action) {
		return action.data;
	},
	[Types.user.CLEAR_USER_ID]() {
		return null;
	},
});
