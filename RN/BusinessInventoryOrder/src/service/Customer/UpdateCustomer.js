import { BaseAxiosInstance } from "../axios";

const UpdateCustomerApi = (retailerId, name, address, phoneNo, gstinNo, onSuccess, onFailure, onError) => {
	const url = "retailer";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.put(url, { name, address, phone_no: phoneNo, retailer_id: retailerId, gstin_no: gstinNo })
		.then((response: any) => {
			if (response.data.status === 1) {
				onSuccess(response.data.data.retailer);
			} else {
				onFailure(response.data.message);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default UpdateCustomerApi;
