import { BaseAxiosInstance } from "../axios";

const AddUserApi = (name, password, email, userType, onSuccess, onFailure, onError) => {
	const url = "add_user";
	BaseAxiosInstance.post(url, { name, password, email, user_type: userType })
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.name);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default AddUserApi;
