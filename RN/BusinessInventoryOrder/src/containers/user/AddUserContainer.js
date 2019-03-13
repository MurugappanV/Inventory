import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { AddUserApi } from "../../service";
import { AlertComp } from "../../components";
import AddUserUI from "./AddUserUI";

type Props = {
	navigation: any,
	setUsersUpdateAction: Function,
};

class AddUserContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			name: "",
			password: "",
			email: "",
			userType: 4,
			loading: false,
		};
	}

	componentDidMount() {
		this.state = {
			name: "",
			password: "",
			email: "",
			userType: 4,
			loading: false,
		};
	}

	onNameInputChange = (name: string) => {
		this.setState({ name });
	};

	onPasswordInputChange = (password: string) => {
		this.setState({ password });
	};

	onEmailInputChange = (email: string) => {
		this.setState({ email });
	};

	onUserTypeInputChange = (userType: number) => {
		this.setState({ userType });
	};

	onAddUser = () => {
		const { name, password, email, userType } = this.state;
		if (name.length > 0 && password.length > 0) {
			AddUserApi(
				name,
				password,
				email,
				userType,
				this.onAddSuccess,
				this.onAddFailure,
				this.onAddError,
			);
			this.setState({ loading: true });
		} else {
			alert("Please enter name and password");
		}
	};

	onAddSuccess = () => {
		this.setState({ loading: false });
		AlertComp("Add user success", "", () => {});
		const { navigation, setUsersUpdateAction } = this.props;
		navigation.goBack();
		setUsersUpdateAction();
	};

	onAddFailure = (message: string) => {
		this.setState({ loading: false });
		AlertComp("Add user failed", message, () => {});
	};

	onAddError = (error: any) => {
		this.setState({ loading: false });
		const message = error.toString();
		AlertComp("Add user error", message, () => {});
	};

	render() {
		const { loading, name, password, email, userType } = this.state;
		return (
			<AddUserUI
				onAddUser={this.onAddUser}
				{...this.props}
				loading={loading}
				name={name}
				password={password}
				email={email}
				userType={userType}
				onNameInputChange={this.onNameInputChange}
				onPasswordInputChange={this.onPasswordInputChange}
				onEmailInputChange={this.onEmailInputChange}
				onUserTypeInputChange={this.onUserTypeInputChange}
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
)(AddUserContainer);
