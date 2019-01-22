import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderUI from "./OrderUI";
import { Actions } from "../../redux";

type Props = {
	navigation: any,
};

class OrdersContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	render() {
		const {} = this.state;
		return <OrderUI {...this.props} />;
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
)(OrdersContainer);
