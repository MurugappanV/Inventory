import Types from "../Types";

export function setUsersAction(items: any) {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.users.SET_USERS, data: { items } });
	};
}

export function clearUsersAction() {
	return (dispatch: any) => {
		// getState
		dispatch({ type: Types.users.CLEAR_USERS });
	};
}