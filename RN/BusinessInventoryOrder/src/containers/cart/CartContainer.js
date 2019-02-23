import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartUI from "./CartUI";
import { Actions } from "../../redux";
import { AlertComp } from "../../components";
import { ItemsApi } from "../../service";

type Props = {
	navigation: any,
	setItemsAction: Function,
	clearItemsAction: Function,
	items: any,
};

class CartContainer extends PureComponent<Props> {
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
		console.log("fetched ", items);
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
		this.setState({ selected: newSelected });
	};

	render() {
		const { loading, noRecordText, selected } = this.state;
		return (
			<CartUI
				onQtyChanged={this.onItemSelected}
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
)(CartContainer);
