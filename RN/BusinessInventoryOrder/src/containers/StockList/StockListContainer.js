import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StockListUI from "./StockListUI";
import { Actions } from "../../redux";
import { AlertComp } from "../../components";
import { ItemsApi, AddStockApi, AddGroupApi, AddSubGroupApi, AddItemApi } from "../../service";

type Props = {
	navigation: any,
	setItemsAction: Function,
	clearItemsAction: Function,
	items: any,
	selectedItems: any,
	deletedItems: any,
	clearCartAction: Function,
	setCartSelectedAction: Function,
	setStockUpdateAction: Function,
};

class StockListContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = { loading: false, noRecordText: "No items found" };
	}

	componentDidMount() {
		this.onItem();
	}

	onItem = () => {
		this.setState({ loading: true });
		const { clearItemsAction } = this.props;
		clearItemsAction();
		ItemsApi(this.onItemSuccess, this.onItemFailure, this.onItemError);
	};

	onItemSuccess = (items: any) => {
		this.setState({ loading: false, noRecordText: "No items found" });
		const { setItemsAction } = this.props;
		setItemsAction(items);
	};

	onItemFailure = (message: string) => {
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch items failed", message, () => {});
	};

	onItemError = (error: any) => {
		const message = error.toString();
		// .includes("Network Error")
		// ? "Please check your internet connection"
		// : "Some error occured, please try again later";
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch item error", message, () => {});
	};

	render() {
		const { loading, noRecordText } = this.state;
		return <StockListUI {...this.props} loading={loading} noRecordText={noRecordText} />;
	}
}

function mapStateToProps(state) {
	return {
		items: state.items,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(StockListContainer);
