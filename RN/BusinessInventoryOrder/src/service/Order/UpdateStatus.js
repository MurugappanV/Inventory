import { BaseAxiosInstance } from "../axios";

const UpdateStatusApi = (orderId, status, onSuccess, onFailure, onError) => {
	const url = "order_status";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.put(url, {
		order_id: orderId,
		status,
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

export default UpdateStatusApi;
