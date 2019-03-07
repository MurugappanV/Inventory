import { BaseAxiosInstance } from "../axios";

const AddCustomerApi = (name, address, phoneNo, gstinNo, onSuccess, onFailure, onError) => {
	const url = "retailer";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.post(url, { name, address, phone_no: phoneNo, gstin_no: gstinNo })
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

export default AddCustomerApi;
