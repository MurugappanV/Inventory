import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartUI from "./CartUI";
import { Actions } from "../../redux";
import { AlertComp } from "../../components";
import { ItemsApi, OrderItemsApi } from "../../service";

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
		this.state = { loading: false, noRecordText: "No items found" };
	}

	componentDidMount() {
		const { navigation } = this.props;
		const id = navigation.getParam("id");

		if (id) {
			this.fetchOrderItems(id);
		} else {
			this.onItem();
		}
	}

	componentWillUnmount() {
		const { clearCartAction } = this.props;
		clearCartAction();
	}

	fetchOrderItems = (id: number) => {
		this.setState({ loading: true });
		const { clearItemsAction } = this.props;
		clearItemsAction();
		OrderItemsApi(id, this.onOrderSuccess, this.onOrderFailure, this.onOrderError);
	};

	onOrderSuccess = (items: any) => {
		const newSelected = new Map();
		const newDeleted = new Map();
		items.forEach(({ item, qty, is_deleted }) => {
			if (is_deleted) {
				newDeleted.set(item.id, { qty, billName: item.bill_name });
			} else {
				newSelected.set(item.id, { qty, billName: item.bill_name });
			}
		});
		const { setCartSelectedAction, setCartDeletedAction } = this.props;
		setCartSelectedAction(newSelected);
		setCartDeletedAction(newDeleted);
		this.onItem(newSelected);
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

	onItem = (selected: any) => {
		this.setState({ loading: true });
		const { clearItemsAction } = this.props;
		clearItemsAction();
		ItemsApi(
			(items: any) => this.onItemSuccess(selected, items),
			this.onItemFailure,
			this.onItemError,
		);
	};

	onItemSuccess = (selected: any, items: any) => {
		this.setState({ loading: false, noRecordText: "No items found" });
		const { setItemsAction, setCartSelectedAction } = this.props;
		const selectedItems = selected || new Map();
		const newSelected = new Map(); //
		const newItems = items.map((group: any) => {
			return {
				...group,
				sub_groups: group.sub_groups.map((subGroup: any) => {
					return {
						...subGroup,
						items: subGroup.items.map((item: any) => {
							if (selectedItems.has(item.id)) {
								const { qty } = selectedItems.get(item.id);
								newSelected.set(item.id, {
									qty,
									billName: item.bill_name,
									available: item.available + qty,
								});
							}
							return {
								...item,
								available: selectedItems.has(item.id)
									? item.available + selectedItems.get(item.id).qty
									: item.available,
							};
						}),
					};
				}),
			};
		});
		setItemsAction(newItems);
		setCartSelectedAction(newSelected);
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

	onItemSelected = (id: number, billName: string, qty: number, available: number) => {
		const { selectedItems, setCartSelectedAction } = this.props;
		const newSelected = new Map([...selectedItems]); //
		if (qty === 0) {
			if (newSelected.has(id)) {
				newSelected.delete(id);
			}
		} else {
			newSelected.set(id, { qty, billName, available });
		}
		setCartSelectedAction(newSelected);
		// this.setState({ selected: newSelected });
	};

	onItemUnSelected = (id: number) => {
		const { selectedItems, setCartSelectedAction } = this.props;
		const newSelected = new Map([...selectedItems]);
		if (newSelected.has(id)) {
			newSelected.delete(id);
		}
		console.log("after unselected", id, newSelected);
		setCartSelectedAction(newSelected);
		// this.setState({ selected: newSelected });
	};

	render() {
		const { loading, noRecordText } = this.state;
		const { selectedItems, deletedItems, navigation } = this.props;
		const id = navigation.getParam("id");
		const retailerId = navigation.getParam("retailerId");
		const otherDetails = navigation.getParam("otherDetails", "");
		return (
			<CartUI
				onQtyChanged={this.onItemSelected}
				onItemUnSelected={this.onItemUnSelected}
				{...this.props}
				loading={loading}
				noRecordText={noRecordText}
				selected={selectedItems}
				deletedItems={deletedItems}
				orderId={id}
				retailerId={retailerId}
				otherDetails={otherDetails}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.items,
		selectedItems: state.selectedItems.selected,
		deletedItems: state.selectedItems.deleted,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CartContainer);
