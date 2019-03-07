import { BaseAxiosInstance } from "../axios";

const AddStockApi = (otherDetails, items, onSuccess, onFailure, onError) => {
	const url = "stock";
	// login='robodiego'
	// password='Buddy6jar!'
	const err = { other_details: otherDetails, items };
	console.log("api body = ", err);
	BaseAxiosInstance.post(url, err)
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.stock_id);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default AddStockApi;
