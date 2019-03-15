import { BaseAxiosInstance } from "../axios";

const AddSubGroupApi = (name, groupId, onSuccess, onFailure, onError) => {
	const url = "add_sub_group";
	BaseAxiosInstance.post(url, { name, group_id: groupId })
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

export default AddSubGroupApi;
