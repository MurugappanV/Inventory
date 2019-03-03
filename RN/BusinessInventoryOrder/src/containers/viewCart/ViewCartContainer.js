import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartUI from "./ViewCartUI";
import { Actions } from "../../redux";
import { OrderItemsApi } from "../../service";

type Props = {
	navigation: any,
	setItemsAction: Function,
	clearItemsAction: Function,
	items: any,
	selectedItems: any,
	deletedItems: any,
	clearCartAction: Function,
	setCartSelectedAction: Function,
	setCartDeletedAction: Function,
};

class CartContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = { loading: false, noRecordText: "No items found", items: [] };
	}

	componentDidMount() {
		const { navigation } = this.props;
		const id = navigation.getParam("id");
		if (id) {
			this.fetchOrderItems(id);
		}
	}

	fetchOrderItems = (id: number) => {
		this.setState({ loading: true });
		OrderItemsApi(id, this.onOrderSuccess, this.onOrderFailure, this.onOrderError);
	};

	onOrderSuccess = (items: any) => {
		this.setState({ loading: false, noRecordText: "No items found", items });
	};

	onOrderFailure = (message: string) => {
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch items failed", message, () => {});
	};

	onOrderError = (error: any) => {
		const message = error.toString();
		// .includes("Network Error")
		// ? "Please check your internet connection"
		// : "Some error occured, please try again later";
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch item error", message, () => {});
	};

	render() {
		const { loading, noRecordText, items } = this.state;
		return (
			<CartUI {...this.props} loading={loading} noRecordText={noRecordText} items={items} />
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CartContainer);
