import Types from "../Types";

export function setUserIdAction(user: any) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SET_USER_ID, data: { user } }); // token, userId, userType
	};
}

export function setUserPermissions(userId, token, permissions: any) {
	return (dispatch, getState) => {
		dispatch({
			type: Types.user.SET_USER_PERMISSIONS,
			data: { user: { user_id: userId, token, ...permissions } },
		}); // token, userId, userType
	};
}

export function clearUserIdAction() {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.CLEAR_USER_ID });
	};
}
