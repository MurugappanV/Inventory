import { BaseAxiosInstance } from "../axios";

const StocksApi = (onSuccess, onFailure, onError) => {
	const url = "stocks";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.stocks);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default StocksApi;
