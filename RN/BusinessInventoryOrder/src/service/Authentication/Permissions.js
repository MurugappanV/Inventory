import { BaseAxiosInstance } from "../axios";

const PermissionsApi = (onSuccess, onFailure, onError) => {
	const url = "permissions";
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default PermissionsApi;
