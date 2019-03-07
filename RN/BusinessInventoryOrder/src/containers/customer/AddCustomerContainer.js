import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { AddCustomerApi } from "../../service";
import { AlertComp } from "../../components";
import AddCustomerUI from "./AddCustomerUI";

type Props = {
	navigation: any,
	setCustomerUpdateAction: Function,
};

const phoneno = /^\d{10}$/;
// /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

class AddCustomerContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			name: "",
			phone: "",
			gst: "",
			address: "",
			loading: false,
		};
	}

	componentDidMount() {
		this.state = {
			name: "",
			phone: "",
			gst: "",
			address: "",
			loading: false,
		};
	}

	onNameInputChange = (name: string) => {
		this.setState({ name });
	};

	onPhoneInputChange = (phone: string) => {
		this.setState({ phone });
	};

	onGstInputChange = (gst: string) => {
		this.setState({ gst });
	};

	onAddressInputChange = (address: string) => {
		this.setState({ address });
	};

	onAddCustomer = () => {
		const { name, phone, gst, address } = this.state;
		if (phone.match(phoneno)) {
			AddCustomerApi(
				name,
				address.split("\n").join(";"),
				phone,
				gst,
				this.onAddSuccess,
				this.onAddFailure,
				this.onAddError,
			);
			this.setState({ loading: true });
		} else {
			alert("Please enter valid phone number");
		}
	};

	onAddSuccess = () => {
		this.setState({ loading: false });
		AlertComp("Add/Update customer success", "", () => {});
		const { navigation, setCustomerUpdateAction } = this.props;
		navigation.goBack();
		setCustomerUpdateAction();
	};

	onAddFailure = (message: string) => {
		this.setState({ loading: false });
		AlertComp("Add/Update customer failed", message, () => {});
	};

	onAddError = (error: any) => {
		this.setState({ loading: false });
		const message = error.toString();
		AlertComp("Add/Update customer error", message, () => {});
	};

	render() {
		const { loading, name, phone, gst, address } = this.state;
		return (
			<AddCustomerUI
				onAddCustomer={this.onAddCustomer}
				{...this.props}
				loading={loading}
				name={name}
				phone={phone}
				address={address}
				gst={gst}
				onNameInputChange={this.onNameInputChange}
				onPhoneInputChange={this.onPhoneInputChange}
				onAddressInputChange={this.onAddressInputChange}
				onGstInputChange={this.onGstInputChange}
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
)(AddCustomerContainer);
