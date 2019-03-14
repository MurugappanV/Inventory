import Types from "../Types";
import createReducer from "./CreateReducer";

const initialUserCredentials = {
	token: null,
	userId: null,
	userType: null,
	permissions: {
		order: {
			add: false,
			bill: false,
			cancel: false,
			close: false,
			edit: false,
			send: false,
			view: false,
		},
		stock: {
			add: false,
			update: false,
			view: false,
		},
		user: {
			add: false,
			update: false,
			view: false,
		},
	},
};

export const userCredentials = createReducer(initialUserCredentials, {
	[Types.user.SET_USER_ID](state, action) {
		const { token, user_id, user_type, permissions } = action.data.user;
		return {
			token,
			userId: user_id,
			userType: user_type,
			permissions,
		};
	},
	[Types.user.SET_USER_PERMISSIONS](state, action) {
		const { token, user_id, user_type, permissions } = action.data.user;
		return {
			token,
			userId: user_id,
			userType: user_type,
			permissions,
		};
	},
	[Types.user.CLEAR_USER_ID]() {
		return initialUserCredentials;
	},
});
