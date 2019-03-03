import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { Colors, ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";
import { getUserCredentialsRealm } from "../../storage";
import { setGlobalHeader } from "../../service";
import { LoadingComp } from "../../components";

type Props = {
	navigation: any,
	setUserIdAction: Function,
};

class AuthLoadContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		const userCred = getUserCredentialsRealm();
		console.log("uc load ", userCred);
		if (userCred != null) {
			const { token, userId, userType } = userCred;
			const { setUserIdAction, navigation } = props;
			setGlobalHeader(token, userId);
			setUserIdAction(token, userId, userType);
			navigation.navigate("Home");
		} else {
			const { navigation } = props;
			navigation.navigate("Login");
		}
	}

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
