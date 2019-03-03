import { BaseAxiosInstance } from "../axios";

const OrderItemsApi = (id, onSuccess, onFailure, onError) => {
	const url = `order_items?order-id=${id}`;
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.orderItems);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default OrderItemsApi;
