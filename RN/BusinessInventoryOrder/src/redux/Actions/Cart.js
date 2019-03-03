import Types from "../Types";

export function setCartSelectedAction(items: any) {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.cart.SET_SELECTED_ITEMS, data: { items } });
	};
}

export function setCartDeletedAction(items: any) {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.cart.SET_DELETED_ITEMS, data: { items } });
	};
}

export function clearCartAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.cart.CLEAR_CART_ITEMS });
	};
}
