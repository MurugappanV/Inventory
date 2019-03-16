import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderUI from "./OrderUI";
import { Actions } from "../../redux";
import { AlertComp } from "../../components";
import { OrdersApi, UpdateOrderApi, UpdateStatusApi } from "../../service";

type Props = {
	navigation: any,
	setOrdersAction: Function,
	clearOrdersAction: Function,
	clearOrderUpdateAction: Function,
	orders: any,
	orderUpdate: boolean,
	permissions: any,
};

class OrdersContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = { loading: false, refreshing: false, noRecordText: "No orders found" };
	}

	componentDidMount() {
		this.onOrder();
	}

	componentDidUpdate(prevProps) {
		const { orderUpdate, clearOrderUpdateAction } = this.props;
		if (orderUpdate && !prevProps.orderUpdate) {
			clearOrderUpdateAction();
			this.onOrder();
		}
	}

	onOrder = () => {
		this.setState({ loading: true });
		const { clearOrdersAction } = this.props;
		clearOrdersAction();
		OrdersApi(this.onOrderSuccess, this.onOrderFailure, this.onOrderError);
	};

	onOrderSuccess = (orders: any) => {
		this.setState({ loading: false, refreshing: false, noRecordText: "No orders found" });
		const { setOrdersAction } = this.props;
		setOrdersAction(orders);
	};

	onOrderFailure = (message: string) => {
		this.setState({ loading: false, refreshing: false, noRecordText: message });
		// AlertComp("Fetch orders failed", message, () => {});
	};

	onOrderError = (error: any) => {
		const message = error.toString();
		// .includes("Network Error")
		// ? "Please check your internet connection"
		// : "Some error occured, please try again later";
		this.setState({ loading: false, refreshing: false, noRecordText: message });
		// AlertComp("Fetch order error", message, () => {});
	};

	onFetchRefresh = () => {
		this.setState({ refreshing: true });
		this.onOrder();
	};

	onOrderPress = (status: number, data: any) => {
		const { navigation } = this.props;
		const { id, retailer, other_details } = data;
		const retailerId = retailer.id;
		const otherDetails = other_details;
		if (status === 1) {
			navigation.navigate("ViewCart", {
				id,
				orderData: data,
			});
		} else if (status === 2) {
			navigation.navigate("Cart", {
				id,
				retailerId,
				otherDetails,
			});
		} else if (status === 3 || status === 4 || status === 5 || status === 6) {
			let stat = "CANCEL";
			if (status === 3) {
				stat = "BILLED";
			} else if (status === 4) {
				stat = "SEND";
			} else if (status === 5) {
				stat = "CLOSED";
			}
			AlertComp("Confirmation", `Sure want to change the status to ${stat}?`, () => {
				UpdateStatusApi(id, status);
				this.onFetchRefresh();
			});
		}
	};

	render() {
		const { loading, refreshing, noRecordText } = this.state;
		return (
			<OrderUI
				{...this.props}
				loading={loading}
				refreshing={refreshing}
				noRecordText={noRecordText}
				onFetchRefresh={this.onFetchRefresh}
				onOrderPress={this.onOrderPress}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		orders: state.orders,
		orderUpdate: state.updates.orderUpdate,
		permissions: state.userCredentials.permissions,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(OrdersContainer);
