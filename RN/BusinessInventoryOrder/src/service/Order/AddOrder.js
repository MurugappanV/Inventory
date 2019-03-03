import { BaseAxiosInstance } from "../axios";

const AddOrderApi = (retailerId, otherDetails, items, onSuccess, onFailure, onError) => {
	const url = "order";
	// login='robodiego'
	// password='Buddy6jar!'
	const err = { retailer_id: retailerId, other_details: otherDetails, items };
	console.log("api body = ", err);
	BaseAxiosInstance.post(url, err)
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.order_id);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default AddOrderApi;
