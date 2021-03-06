import React, { PureComponent } from "react";
import { View, StyleSheet, Picker, Text, Image } from "react-native";
import { TextField } from "react-native-material-textfield";
import { Button } from "../../components";
import { Header } from "../header";
import { ScalePerctFullHeight, ScalePerctFullWidth, Colors, Images } from "../../asset";

type Props = {
	name: string,
	password: string,
	email: string,
	userType: number,
	onNameInputChange: Function,
	onPasswordInputChange: Function,
	onEmailInputChange: Function,
	onUserTypeInputChange: Function,
	onAddUser: Function,
	loading: boolean,
	navigation: any,
};

export default class AddUserUI extends PureComponent<Props> {
	render() {
		const {
			name,
			password,
			email,
			userType,
			onNameInputChange,
			onPasswordInputChange,
			onEmailInputChange,
			onAddUser,
			onUserTypeInputChange,
			loading,
			navigation,
		} = this.props;
		return (
			<View style={styles.cont}>
				<Image source={Images.bgImg} style={styles.fullContainer} resizeMode={"stretch"} />
				<Header
					title="New User"
					navigation={navigation}
					onBack={() => navigation.goBack()}
				/>
				<View style={styles.inputContainer}>
					<TextField
						onSubmitEditing={() => this.textInput.focus()}
						returnKeyType="next"
						label="Enter name "
						value={name}
						onChangeText={input => onNameInputChange(input)}
						textColor={Colors.bodyPrimaryLight}
						baseColor={Colors.bodyPrimaryLight}
						tintColor={Colors.bodySecondaryDark}
					/>
					<TextField
						ref={(component: any) => {
							this.textInput = component;
						}}
						returnKeyType="next"
						onSubmitEditing={() => this.textInput2.focus()}
						label="Enter password"
						value={password}
						onChangeText={input => onPasswordInputChange(input)}
						textColor={Colors.bodyPrimaryLight}
						baseColor={Colors.bodyPrimaryLight}
						tintColor={Colors.bodySecondaryDark}
					/>
					<TextField
						ref={(component: any) => {
							this.textInput2 = component;
						}}
						returnKeyType="next"
						onSubmitEditing={() => {}}
						label="Enter email address"
						value={email}
						onChangeText={input => onEmailInputChange(input)}
						textColor={Colors.bodyPrimaryLight}
						baseColor={Colors.bodyPrimaryLight}
						tintColor={Colors.bodySecondaryDark}
					/>
					<Text style={styles.otherDetailsText}>{"Select user type"}</Text>
					<Picker
						selectedValue={userType}
						style={styles.picker}
						onValueChange={(itemValue: number) => onUserTypeInputChange(itemValue)}
					>
						<Picker.Item color={Colors.bgPrimaryDark} label="Viewer" value={4} />
						<Picker.Item color={Colors.bgPrimaryDark} label="Admin" value={1} />
						<Picker.Item color={Colors.bgPrimaryDark} label="Manager" value={2} />
						<Picker.Item color={Colors.bgPrimaryDark} label="Sales Person" value={3} />
					</Picker>
				</View>
				<Button style={styles.loginBtn} title="ADD" onPress={onAddUser} loading={loading} />
			</View>
		);
	}
}

AddUserUI.defaultProps = {};

const styles = StyleSheet.create({
	cont: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
	},
	loginBtn: {
		alignSelf: "center",
		width: "40%",
	},
	inputContainer: {
		paddingHorizontal: ScalePerctFullWidth(10),
		paddingBottom: 50,
	},
	otherDetailsText: {
		fontSize: 11,
		paddingTop: 20,
		paddingBottom: 5,
		paddingHorizontal: 5,
		color: Colors.bgPrimaryDark,
	},
	otherDetailsInput: {
		fontSize: 11,
		padding: 10,
		marginBottom: 20,
		borderColor: Colors.bgPrimaryDark,
		borderWidth: 1,
		height: 100,
		alignSelf: "stretch",
		textAlignVertical: "top",
		color: Colors.bodySemiTransparent,
	},
	fullContainer: {
		position: "absolute",
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
		zIndex: -1,
	},
	picker: {
		height: 40,
		width: 200,
		padding: 0,
		borderColor: Colors.bgPrimaryDark,
		borderWidth: 1,
	},
});
