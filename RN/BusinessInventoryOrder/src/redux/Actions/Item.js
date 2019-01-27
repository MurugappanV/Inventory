import Types from "../Types";

export function setItemsAction(items: any) {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.item.SET_ITEMS, data: { items } });
	};
}

export function clearItemsAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.item.CLEAR_ITEMS });
	};
}
