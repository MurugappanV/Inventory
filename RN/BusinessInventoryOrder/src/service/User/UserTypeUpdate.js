import { BaseAxiosInstance } from "../axios";

const UpdateUserTypeApi = (updateUserId, userType, onSuccess, onFailure, onError) => {
	const url = "update_user_type";
	BaseAxiosInstance.put(url, {
		update_user_id: updateUserId,
		user_type: userType,
	})
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

export default UpdateUserTypeApi;
