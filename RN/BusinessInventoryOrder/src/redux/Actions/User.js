import Types from "../Types";

export function setUserIdAction(token, userId, userType) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SET_USER_ID, data: { token, userId, userType } });
	};
}

export function clearUserIdAction() {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.CLEAR_USER_ID });
	};
}
