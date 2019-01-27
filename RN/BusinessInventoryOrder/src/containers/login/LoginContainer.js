import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoginUI from "./LoginUI";
import { LoginApi, setGlobalHeader } from "../../service";
import { AlertComp } from "../../components";
import { addUserCredentialsRealm } from "../../storage";
import { Actions } from "../../redux";

type Props = {
	navigation: any,
	setUserIdAction: Function,
};

class LoginContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			name: "",
			password: "",
			loading: false,
		};
	}

	onIdInputChange = (name: string) => {
		this.setState({ name });
	};

	onPasswordInputChange = (password: string) => {
		this.setState({ password });
	};

	onLogin = () => {
		const { name, password } = this.state;
		this.setState({ loading: true });
		LoginApi(name, password, this.onLoginSuccess, this.onLoginFailure, this.onLoginError);
	};

	onLoginSuccess = (token: string, userId: number) => {
		const { navigation, setUserIdAction } = this.props;
		this.setState({ loading: false });
		setGlobalHeader(token, userId);
		addUserCredentialsRealm(token, userId);
		setUserIdAction(token, userId);
		navigation.navigate("Home");
	};

	onLoginFailure = (message: string) => {
		this.setState({ loading: false });
		AlertComp("Login Failed", message, () => {});
	};

	onLoginError = (error: any) => {
		const message = error.toString();
		// .includes("Network Error")
		// ? "Please check your internet connection"
		// : "Some error occured, please try again later";
		this.setState({ loading: false });
		AlertComp("Login Error", message, () => {});
	};

	render() {
		const { name, password, loading } = this.state;
		return (
			<LoginUI
				{...this.props}
				onIdInputChange={this.onIdInputChange}
				onPasswordInputChange={this.onPasswordInputChange}
				onLogin={this.onLogin}
				name={name}
				password={password}
				loading={loading}
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
)(LoginContainer);
