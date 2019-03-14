import React, { PureComponent } from "react";
import HeaderUI from "./HeaderUI";
import { LogoutApi } from "../../service";
import { setUserStorage } from "../../storage";
import { AlertComp } from "../../components";

type Props = {
	navigation?: any,
};

export default class Header extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onLogout = () => {
		AlertComp(
			"",
			"Sure, you want to logout?",
			() => {
				LogoutApi(this.onLogOutSuccess, this.onLogOutFailure, this.onLogOutError);
				setUserStorage(null);
				const { navigation } = this.props;
				navigation.navigate("Login");
			},
			true,
		);
	};

	onLogOutSuccess = () => {};

	onLogOutFailure = (message: string) => {};

	onLogOutError = (error: string) => {};

	render() {
		return <HeaderUI {...this.props} onLogout={this.onLogout} />;
	}
}

Header.defaultProps = {
	navigation: undefined,
};
