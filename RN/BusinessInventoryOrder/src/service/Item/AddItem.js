import { BaseAxiosInstance } from "../axios";

const AddItemApi = (name, billName, subGroupId, onSuccess, onFailure, onError) => {
	const url = "add_item";
	BaseAxiosInstance.post(url, { name, bill_name: billName, sub_group_id: subGroupId })
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

export default AddItemApi;
