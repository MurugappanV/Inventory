import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderUI from "./OrderUI";
import { Actions } from "../../redux";
import { AlertComp } from "../../components";
import { OrdersApi } from "../../service";

type Props = {
	navigation: any,
	setOrdersAction: Function,
	clearOrdersAction: Function,
	orders: any,
};

class OrdersContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = { loading: false, refreshing: false, noRecordText: "No orders found" };
	}

	componentDidMount() {
		this.onOrder();
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
		console.log("fetched ", orders);
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
		console.log("on refresh");
		this.setState({ refreshing: true });
		this.onOrder();
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
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		orders: state.orders,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(OrdersContainer);
