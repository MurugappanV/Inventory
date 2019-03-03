import { BaseAxiosInstance } from "../axios";

const UpdateOrderApi = (
	orderId,
	retailerId,
	otherDetails,
	items,
	onSuccess,
	onFailure,
	onError,
) => {
	const url = "order";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.put(url, {
		order_id: orderId,
		retailer_id: retailerId,
		other_details: otherDetails,
		items,
	})
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

export default UpdateOrderApi;
