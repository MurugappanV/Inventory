import { BaseAxiosInstance } from "../axios";

const UsersApi = (onSuccess, onFailure, onError) => {
	const url = "all_users";
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.users);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default UsersApi;
