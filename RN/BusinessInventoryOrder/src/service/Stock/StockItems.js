import { BaseAxiosInstance } from "../axios";

const StockItemsApi = (id, onSuccess, onFailure, onError) => {
	const url = `stock_items?stock-id=${id}`;
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.stockItems);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default StockItemsApi;
