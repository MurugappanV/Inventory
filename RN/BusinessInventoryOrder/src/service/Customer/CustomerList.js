import { BaseAxiosInstance } from "../axios";

const CustomerListApi = (onSuccess, onFailure, onError) => {
	const url = "retailers";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			console.log("resonse", response);
			if (response.data.status === 1) {
				onSuccess(response.data.data.retailers);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			console.log("error", error);
			onError(error);
		});
};

export default CustomerListApi;
