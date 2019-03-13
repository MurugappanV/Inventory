import { BaseAxiosInstance } from "../axios";

const AddGroupApi = (name, onSuccess, onFailure, onError) => {
	const url = "add_group";
	BaseAxiosInstance.post(url, { name })
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

export default AddGroupApi;
