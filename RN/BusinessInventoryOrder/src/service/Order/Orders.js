import { BaseAxiosInstance } from "../axios";

const OrdersApi = (onSuccess, onFailure, onError) => {
	const url = "orders";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.orders);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default OrdersApi;
