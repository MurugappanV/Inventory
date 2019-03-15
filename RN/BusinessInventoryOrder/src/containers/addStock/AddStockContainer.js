import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddStockUI from "./AddStockUI";
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

class AddStockContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = { loading: false, noRecordText: "No items found", selected: new Map(), alertSettings: null };
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

	onAddItem = (name: string, billName: string, subGroupId: number, ) => {
		AddItemApi(
			name,
			billName,
			subGroupId,
			(response: any) => this.onAddItemSuccess(response, subGroupId),
			(msg: any) => this.onAddFailure("Add item failed", msg),
			(err: any) => this.onAddError("Add item error", err),
		);
	};

	onAddGroup = (name: string) => {
		AddGroupApi(
			name,
			this.onAddGroupSuccess,
			(msg: any) => this.onAddFailure("Add group failed", msg),
			(err: any) => this.onAddError("Add group error", err),
		);
	};

	onAddSubGroup = (name: string, groupId: number) => {
		AddSubGroupApi(
			name,
			groupId,
			(response: any) => this.onAddSubGroupSuccess(response, groupId),
			(msg: any) => this.onAddFailure("Add sub group failed", msg),
			(err: any) => this.onAddError("Add sub group error", err),
		);
	};

	onAddItemSuccess = (response: any, subGroupId: number) => {
		AlertComp("Add item success", "", () => {});
		const { setItemsAction, items } = this.props;
		const newItems = items.map((group: any) => {
			return {
				...group,
				sub_groups: group.sub_groups.map((subGroup: any) => {
					if (subGroup.id == subGroupId) {
						return {
							...subGroup,
							items: subGroup.items ? subGroup.items.map((item: any) => {
								return {
									...item,
								};
							}).concat([{ ...response, available: 0 }]) : [{ ...response, available: 0 }],
						};
					}
					return {
						...subGroup,
					};
				}),
			};
		});
		setItemsAction(newItems);
		this.setState({ alertSettings: null });
	};

	onAddGroupSuccess = (response: any) => {
		AlertComp("Add group success", "", () => {});
		const { setItemsAction, items } = this.props;
		const newItems = items.map((group: any) => {
			return {
				...group,
			};
		}).concat([{ ...response }]);
		console.log("add group props", newItems, response)
		setItemsAction(newItems);
		this.setState({ alertSettings: null });
	};

	onAddSubGroupSuccess = (response: any, groupId: number) => {
		AlertComp("Add sub group success", "", () => {});
		const { setItemsAction, items } = this.props;
		const newItems = items.map((group: any) => {
			if (group.id == groupId) {
				return {
					...group,
					sub_groups: group.sub_groups ? group.sub_groups.map((subGroup: any) => {
						return {
							...subGroup,
						};
					}).concat([{ ...response }]) : [{ ...response }],
				};
			}
			return {
				...group,
			};
		});
		setItemsAction(newItems);
		this.setState({ alertSettings: null });
	};

	onAddFailure = (title: string, message: string) => {
		AlertComp(title, message, () => {});
		this.setState({ alertSettings: null });
	};

	onAddError = (title: string, error: any) => {
		const message = error.toString();
		AlertComp(title, message, () => {});
		this.setState({ alertSettings: null });
	};

	onAlertClose = () => {
		this.setState({ alertSettings: null });
	}

	onAlertOpen = (type: number, id: number) => { // 1 - group, 2 - subgroup, 3 - item
		let alertSettings = null;
		switch (type) {
		case 1:
			alertSettings = {
				placeholder1: "Enter group name",
				title: "Add group",
				onConfirm: (name: string) => this.onAddGroup(name),
			}
			break;
		case 2:
			alertSettings = {
				placeholder1: "Enter sub group name",
				title: "Add sub group",
				onConfirm: (name: string) => this.onAddSubGroup(name, id),
			}
			break;
		case 3:
			alertSettings = {
				placeholder1: "Enter item name",
				placeholder2: "Enter item bill name",
				title: "Add item",
				onConfirm: (name: string, billName: string) => this.onAddItem(name, billName, id),
			}
			break;
		default:
			break;
		}
		this.setState({ alertSettings });
	}

	render() {
		const { loading, noRecordText, selected, alertSettings } = this.state;
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
				alertSettings={alertSettings}
				onAlertClose={this.onAlertClose}
				onAlertOpen={this.onAlertOpen}
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
