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
