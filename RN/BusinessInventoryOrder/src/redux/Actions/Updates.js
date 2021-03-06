import Types from "../Types";

export function setOrderUpdateAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.update.SET_UPDATE_ORDER });
	};
}

export function clearOrderUpdateAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.update.CLEAR_UPDATE_ORDER });
	};
}

export function setStockUpdateAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.update.SET_UPDATE_STOCK });
	};
}

export function clearStockUpdateAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.update.CLEAR_UPDATE_STOCK });
	};
}

export function setCustomerUpdateAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.update.SET_UPDATE_CUSTOMER });
	};
}

export function clearCustomerUpdateAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.update.CLEAR_UPDATE_CUSTOMER });
	};
}

export function setUsersUpdateAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.update.SET_UPDATE_USERS });
	};
}

export function clearUsersUpdateAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.update.CLEAR_UPDATE_USERS });
	};
}