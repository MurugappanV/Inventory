import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddStockUI from "./AddStockUI";
import { Actions } from "../../redux";
import { AlertComp } from "../../components";
import { ItemsApi, AddStockApi } from "../../service";

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

class AddStockContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = { loading: false, noRecordText: "No items found", selected: new Map() };
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

	onItemSelected = (id: number, billName: string, qty: number) => {
		// const { selectedItems, setCartSelectedAction } = this.props;
		const { selected } = this.state;
		const newSelected = new Map([...selected]); //
		if (qty === 0) {
			if (newSelected.has(id)) {
				newSelected.delete(id);
			}
		} else {
			newSelected.set(id, { qty, billName });
		}
		console.log("selected", newSelected);
		// setCartSelectedAction(newSelected);
		this.setState({ selected: newSelected });
	};

	onItemUnSelected = (id: number) => {
		// const { selectedItems, setCartSelectedAction } = this.props;
		const { selected } = this.state;
		const newSelected = new Map([...selected]);
		if (newSelected.has(id)) {
			newSelected.delete(id);
		}
		console.log("after unselected", id, newSelected);
		// setCartSelectedAction(newSelected);
		this.setState({ selected: newSelected });
	};

	onAddStock = () => {
		const { selected } = this.state;
		const items = [];
		selected.forEach((value, key) => {
			items.push({
				item_id: key,
				qty: value.qty,
			});
		});
		AddStockApi(
			"",
			items,
			this.onAddStockSuccess,
			this.onAddStockFailure,
			this.onAddStockError,
		);
	};

	onAddStockSuccess = (id: any) => {
		AlertComp("Add stock success", "", () => {});
		const { navigation, setStockUpdateAction } = this.props;
		navigation.navigate("Stocks");
		setStockUpdateAction();
	};

	onAddStockFailure = (message: string) => {
		AlertComp("Add stock failed", message, () => {});
	};

	onAddStockError = (error: any) => {
		const message = error.toString();
		AlertComp("Add stock error", message, () => {});
	};

	render() {
		const { loading, noRecordText, selected } = this.state;
		// const { selectedItems, deletedItems, navigation } = this.props;
		// const id = navigation.getParam("id");
		// const retailerId = navigation.getParam("retailerId");
		// const otherDetails = navigation.getParam("otherDetails", "");
		return (
			<AddStockUI
				onQtyChanged={this.onItemSelected}
				onItemUnSelected={this.onItemUnSelected}
				onAddStock={this.onAddStock}
				{...this.props}
				loading={loading}
				noRecordText={noRecordText}
				selected={selected}
			/>
		);
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
)(AddStockContainer);
