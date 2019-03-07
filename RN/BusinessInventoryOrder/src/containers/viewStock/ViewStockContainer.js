import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StockUI from "./ViewStockUI";
import { Actions } from "../../redux";
import { StockItemsApi } from "../../service";

type Props = {
	navigation: any,
	setItemsAction: Function,
	clearItemsAction: Function,
	items: any,
	selectedItems: any,
	deletedItems: any,
	clearStockAction: Function,
	setStockSelectedAction: Function,
	setStockDeletedAction: Function,
};

class ViewStockContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
			noRecordText: "No items found",
			items: [],
			stockData: undefined,
		};
	}

	componentDidMount() {
		const { navigation } = this.props;
		const id = navigation.getParam("id");
		const stockData = navigation.getParam("stockData");
		if (id) {
			this.fetchStockItems(id);
		}
		this.setState({ stockData });
	}

	fetchStockItems = (id: number) => {
		this.setState({ loading: true });
		StockItemsApi(id, this.onStockSuccess, this.onStockFailure, this.onStockError);
	};

	onStockSuccess = (items: any) => {
		this.setState({ loading: false, noRecordText: "No items found", items });
	};

	onStockFailure = (message: string) => {
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch items failed", message, () => {});
	};

	onStockError = (error: any) => {
		const message = error.toString();
		// .includes("Network Error")
		// ? "Please check your internet connection"
		// : "Some error occured, please try again later";
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch item error", message, () => {});
	};

	render() {
		const { loading, noRecordText, items, stockData } = this.state;
		return (
			<StockUI
				{...this.props}
				loading={loading}
				noRecordText={noRecordText}
				items={items}
				stockData={stockData}
			/>
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
)(ViewStockContainer);
