import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { Colors, ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";
import { getUserStorage } from "../../storage";
import { setGlobalHeader, PermissionsApi } from "../../service";
import { LoadingComp } from "../../components";

type Props = {
	navigation: any,
	setUserPermissions: Function,
};

class AuthLoadContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		getUserStorage()
			.then((user: string) => {
				if (user != null) {
					const userCred = user.split(",");
					setGlobalHeader(userCred[1], userCred[0]);
					PermissionsApi(
						(permissions: any) => {
							this.onPreferenceSuccess(userCred[0], userCred[1], permissions);
						},
						this.onFailure,
						this.onFailure,
					);
				} else {
					this.onFailure();
				}
			})
			.catch(() => {
				this.onFailure();
			});
	}

	onPreferenceSuccess = (userId, token, permissions) => {
		const { setUserPermissions, navigation } = this.props;
		setUserPermissions(userId, token, permissions);
		navigation.navigate("Home");
	};

	onFailure = () => {
		const { navigation } = this.props;
		navigation.navigate("Login");
	};

	render() {
		return (
			<View style={styles.container}>
				<LoadingComp title="Authenticating..." />
			</View>
		);
	}
}

function mapStateToProps() {
	// state
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AuthLoadContainer);

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		backgroundColor: Colors.bgPrimaryDark,
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
	},
});
