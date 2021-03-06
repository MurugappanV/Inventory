import Types from "../Types";
import createReducer from "./CreateReducer";

const initialUpdates = {
	orderUpdate: false,
	stockUpdate: false,
	customerUpdate: false,
	usersUpdate: false,
};

export const updates = createReducer(initialUpdates, {
	[Types.update.SET_UPDATE_ORDER](state) {
		return {
			...state,
			orderUpdate: true,
		};
	},
	[Types.update.CLEAR_UPDATE_ORDER](state) {
		return {
			...state,
			orderUpdate: false,
		};
	},
	[Types.update.SET_UPDATE_STOCK](state) {
		return {
			...state,
			stockUpdate: true,
		};
	},
	[Types.update.CLEAR_UPDATE_STOCK](state) {
		return {
			...state,
			stockUpdate: false,
		};
	},
	[Types.update.SET_UPDATE_CUSTOMER](state) {
		return {
			...state,
			customerUpdate: true,
		};
	},
	[Types.update.CLEAR_UPDATE_CUSTOMER](state) {
		return {
			...state,
			customerUpdate: false,
		};
	},
	[Types.update.SET_UPDATE_USERS](state) {
		return {
			...state,
			usersUpdate: true,
		};
	},
	[Types.update.CLEAR_UPDATE_USERS](state) {
		return {
			...state,
			usersUpdate: false,
		};
	},
});
