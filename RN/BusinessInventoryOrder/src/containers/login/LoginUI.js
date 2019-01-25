import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { TextField } from "react-native-material-textfield";
import { Button } from "../../components";
import { Header } from "../header";
import { ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";

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
			<View>
				<Header title="Login" />
				<View style={styles.inputContainer}>
					<TextField
						onSubmitEditing={() => this.textInput.focus()}
						returnKeyType="next"
						label="Enter name "
						value={name}
						onChangeText={input => onIdInputChange(input)}
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
					/>
				</View>
				<Button
					style={styles.loginBtn}
					title="LOGIN"
					onPress={onLogin}
					loading={loading}
				/>
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
});
