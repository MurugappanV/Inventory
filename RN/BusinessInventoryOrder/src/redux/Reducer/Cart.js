import Types from "../Types";
import createReducer from "./CreateReducer";

const initialData = { selected: new Map(), deleted: new Map() };

export const selectedItems = createReducer(initialData, {
	[Types.cart.SET_SELECTED_ITEMS](state, action) {
		return {
			...state,
			selected: action.data.items,
		};
	},
	[Types.cart.SET_DELETED_ITEMS](state, action) {
		return {
			...state,
			deleted: action.data.items,
		};
	},
	[Types.cart.CLEAR_CART_ITEMS]() {
		return initialData;
	},
});
