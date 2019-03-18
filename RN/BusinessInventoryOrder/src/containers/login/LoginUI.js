import React, { PureComponent } from "react";
import { Image, View, StyleSheet } from "react-native";
import { TextField } from "react-native-material-textfield";
import { Button } from "../../components";
import { Header } from "../header";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	name: string,
	password: string,
	onIdInputChange: Function,
	onPasswordInputChange: Function,
	onLogin: Function,
	loading: boolean,
};

export default class LoginUI extends PureComponent<Props> {
	render() {
		const {
			name,
			password,
			onIdInputChange,
			onPasswordInputChange,
			onLogin,
			loading,
		} = this.props;
		return (
			<View style={{ flex: 1 }}>
				<Image source={Images.bgImg} style={styles.fullContainer} resizeMode={"stretch"} />
				<Header title="Login" />
				<View style={styles.inputContainer}>
					<TextField
						onSubmitEditing={() => this.textInput.focus()}
						returnKeyType="next"
						label="Enter name "
						value={name}
						onChangeText={input => onIdInputChange(input)}
						textColor={Colors.bodyPrimaryLight}
						baseColor={Colors.bodyPrimaryLight}
						tintColor={Colors.bodySecondaryDark}
					/>
					<TextField
						ref={(component: any) => {
							this.textInput = component;
						}}
						returnKeyType="done"
						secureTextEntry
						onSubmitEditing={onLogin}
						label="Enter password"
						value={password}
						onChangeText={input => onPasswordInputChange(input)}
						textColor={Colors.bodyPrimaryLight}
						baseColor={Colors.bodyPrimaryLight}
						tintColor={Colors.bodySecondaryDark}
					/>
				</View>
				<Button style={styles.loginBtn} title="LOGIN" onPress={onLogin} loading={loading} />
			</View>
		);
	}
}

LoginUI.defaultProps = {};

const styles = StyleSheet.create({
	loginBtn: {
		alignSelf: "center",
		width: "40%",
	},
	inputContainer: {
		paddingHorizontal: ScalePerctFullWidth(10),
		paddingVertical: ScalePerctFullHeight(10),
	},
	fullContainer: {
		position: "absolute",
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
		zIndex: -1,
	},
});
