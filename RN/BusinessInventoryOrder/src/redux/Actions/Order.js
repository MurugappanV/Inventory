import Types from "../Types";

export function setOrdersAction(orders: any) {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.order.SET_ORDERS, data: { orders } });
	};
}

export function clearOrdersAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.order.CLEAR_ORDERS });
	};
}
