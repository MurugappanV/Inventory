import Types from "../Types";

export function setStocksAction(stocks: any) {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.stock.SET_STOCKS, data: { stocks } });
	};
}

export function clearStocksAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.stock.CLEAR_STOCKS });
	};
}
