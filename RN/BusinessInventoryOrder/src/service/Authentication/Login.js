import { BaseAxiosInstance } from "../axios";

const LoginApi = (userName, password, onSuccess, onFailure, onError) => {
	const url = "login";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.post(url, { name: userName, password })
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.token, response.data.data.user_id);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default LoginApi;
