import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomerUI from "./CustomerUI";
import { Actions } from "../../redux";
// import { AlertComp } from "../../components";
import { CustomerListApi, AddOrderApi, UpdateOrderApi } from "../../service";
import { AlertComp } from "../../components";

type Props = {
	navigation: any,
	clearCustomersAction: Function,
	setCustomersAction: Function,
	setOrderUpdateAction: Function,
	clearCustomerUpdateAction: Function,
	items: any,
	customers: any,
	selectedItems: any,
	customerUpdate: boolean,
};

class CustomerContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		const retailerId = props.navigation.getParam("retailerId");
		const otherDetails = props.navigation.getParam("otherDetails", "");
		this.state = {
			loading: false,
			noRecordText: "No customers found",
			customerId: retailerId,
			otherDetails,
		};
	}

	componentDidMount() {
		this.fetchCustomers();
	}

	componentDidUpdate(prevProps) {
		const { customerUpdate, clearCustomerUpdateAction } = this.props;
		if (customerUpdate && !prevProps.customerUpdate) {
			clearCustomerUpdateAction();
			this.fetchCustomers();
		}
	}

	componentWillUnmount() {
		const { clearCustomersAction } = this.props;
		clearCustomersAction();
	}

	fetchCustomers = () => {
		this.setState({ loading: true });
		const { clearCustomersAction } = this.props;
		clearCustomersAction();
		CustomerListApi(this.onCustomersSuccess, this.onCustomersFailure, this.onCustomersError);
	};

	onCustomersSuccess = (items: any) => {
		this.setState({ loading: false, noRecordText: "No customers found" });
		const { setCustomersAction } = this.props;
		setCustomersAction(items);
		// const { setItemsAction } = this.props;
		// setItemsAction(items);
	};

	onCustomersFailure = (message: string) => {
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch items failed", message, () => {});
	};

	onCustomersError = (error: any) => {
		const message = error.toString();
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch item error", message, () => {});
	};

	onItemSelected = (customerId: number) => {
		this.setState({ customerId });
		// const { selected } = this.state;
		// const newSelected = new Map([...selected]); //
		// if (qty === 0) {
		// 	if (newSelected.has(id)) {
		// 		newSelected.delete(id);
		// 	}
		// } else {
		// 	newSelected.set(id, { qty, billName });
		// }
		// console.log("selected", newSelected);
		// this.setState({ selected: newSelected });
	};

	onConfirm = () => {
		const { selectedItems, navigation } = this.props;
		const { customerId, otherDetails } = this.state;
		const orderId = navigation.getParam("id");
		const items = [];
		selectedItems.forEach((value, key) => {
			items.push({
				item_id: key,
				qty: value.qty,
			});
		});
		if (orderId) {
			UpdateOrderApi(
				orderId,
				customerId,
				otherDetails,
				items,
				this.onOrderSuccess,
				this.onOrderFailure,
				this.onOrderError,
			);
		} else {
			AddOrderApi(
				customerId,
				otherDetails,
				items,
				this.onOrderSuccess,
				this.onOrderFailure,
				this.onOrderError,
			);
		}
	};

	onOrderSuccess = (id: any) => {
		AlertComp("Add/Update order success", "", () => {});
		const { navigation, setOrderUpdateAction } = this.props;
		navigation.navigate("Orders");
		setOrderUpdateAction();
	};

	onOrderFailure = (message: string) => {
		AlertComp("Add/Update order failed", message, () => {});
	};

	onOrderError = (error: any) => {
		const message = error.toString();
		AlertComp("Add/Update order error", message, () => {});
	};

	onAddCustomer = () => {
		const { navigation } = this.props;
		navigation.navigate("AddCustomer");
	};

	onOtherDetailsChange = (text: string) => {
		this.setState({ otherDetails: text });
	};

	render() {
		const { loading, noRecordText, customerId, otherDetails } = this.state;
		const { customers } = this.props;
		return (
			<CustomerUI
				onItemSelected={this.onItemSelected}
				onAddCustomer={this.onAddCustomer}
				{...this.props}
				loading={loading}
				noRecordText={noRecordText}
				customers={customers}
				customerId={customerId}
				onConfirm={this.onConfirm}
				otherDetails={otherDetails}
				onOtherDetailsChange={this.onOtherDetailsChange}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		customers: state.customers,
		selectedItems: state.selectedItems.selected,
		customerUpdate: state.updates.customerUpdate,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CustomerContainer);
