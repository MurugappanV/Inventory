import Types from "../Types";

export function setUserIdAction(token, userId) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SET_USER_ID, data: { token, userId } });
	};
}

export function clearUserIdAction() {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.CLEAR_USER_ID });
	};
}
