import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StockUI from "./StockUI";
import { Actions } from "../../redux";
import { AlertComp } from "../../components";
import { StocksApi } from "../../service";

type Props = {
	navigation: any,
	setStocksAction: Function,
	clearStocksAction: Function,
	clearStockUpdateAction: Function,
	stocks: any,
	stockUpdate: boolean,
	userType: number,
};

class StocksContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = { loading: false, refreshing: false, noRecordText: "No stocks found" };
	}

	componentDidMount() {
		this.onStock();
	}

	componentDidUpdate(prevProps) {
		const { stockUpdate, clearStockUpdateAction } = this.props;
		if (stockUpdate && !prevProps.stockUpdate) {
			clearStockUpdateAction();
			this.onStock();
		}
	}

	onStock = () => {
		this.setState({ loading: true });
		const { clearStocksAction } = this.props;
		clearStocksAction();
		StocksApi(this.onStockSuccess, this.onStockFailure, this.onStockError);
	};

	onStockSuccess = (stocks: any) => {
		this.setState({ loading: false, refreshing: false, noRecordText: "No stocks found" });
		const { setStocksAction } = this.props;
		setStocksAction(stocks);
	};

	onStockFailure = (message: string) => {
		this.setState({ loading: false, refreshing: false, noRecordText: message });
		// AlertComp("Fetch stocks failed", message, () => {});
	};

	onStockError = (error: any) => {
		const message = error.toString();
		// .includes("Network Error")
		// ? "Please check your internet connection"
		// : "Some error occured, please try again later";
		this.setState({ loading: false, refreshing: false, noRecordText: message });
		// AlertComp("Fetch stock error", message, () => {});
	};

	onFetchRefresh = () => {
		this.setState({ refreshing: true });
		this.onStock();
	};

	onStockPress = (data: any) => {
		const { navigation } = this.props;
		const { id } = data;
		navigation.navigate("ViewStock", {
			id,
			stockData: data,
		});
	};

	render() {
		const { loading, refreshing, noRecordText } = this.state;
		return (
			<StockUI
				{...this.props}
				loading={loading}
				refreshing={refreshing}
				noRecordText={noRecordText}
				onFetchRefresh={this.onFetchRefresh}
				onStockPress={this.onStockPress}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		stocks: state.stocks,
		stockUpdate: state.updates.stockUpdate,
		userType: state.userCredentials.userType,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(StocksContainer);
