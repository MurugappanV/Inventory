import Types from "../Types";

export function setCustomersAction(items: any) {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.customer.SET_CUSTOMERS, data: { items } });
	};
}

export function clearCustomersAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.customer.CLEAR_CUSTOMERS });
	};
}
