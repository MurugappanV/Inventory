import React, { PureComponent } from "react";
import { View, StyleSheet, Picker } from "react-native";
import { TextField } from "react-native-material-textfield";
import { Button } from "../../components";
import { Header } from "../header";
import { ScalePerctFullHeight, ScalePerctFullWidth, Colors } from "../../asset";

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
			<View>
				<Header
					title="New Customer"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<View style={styles.inputContainer}>
					<TextField
						onSubmitEditing={() => this.textInput.focus()}
						returnKeyType="next"
						label="Enter name "
						value={name}
						onChangeText={input => onNameInputChange(input)}
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
					/>
					<TextField
						ref={(component: any) => {
							this.textInput2 = component;
						}}
						returnKeyType="next"
						onSubmitEditing={() => this.textInput3.focus()}
						label="Enter email address"
						value={email}
						onChangeText={input => onEmailInputChange(input)}
					/>
					<Picker
						selectedValue={userType}
						style={styles.picker}
						onValueChange={(itemValue: number) => onUserTypeInputChange(itemValue)}
					>
						<Picker.Item label="Viewer" value={4} />
						<Picker.Item label="Admin" value={1} />
						<Picker.Item label="Manager" value={2} />
						<Picker.Item label="Sales Person" value={3} />
					</Picker>
				</View>
				<Button
					style={styles.loginBtn}
					title="ADD"
					onPress={onAddUser}
					loading={loading}
				/>
			</View>
		);
	}
}

AddUserUI.defaultProps = {};

const styles = StyleSheet.create({
	loginBtn: {
		alignSelf: "center",
		width: "40%",
	},
	inputContainer: {
		paddingHorizontal: ScalePerctFullWidth(10),
		paddingVertical: ScalePerctFullHeight(10),
	},
	otherDetailsText: {
		fontSize: 11,
		paddingTop: 20,
		paddingBottom: 5,
		paddingHorizontal: 5,
		color: Colors.bodySecondaryVarient,
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
	},
	picker: {
		height: 50,
		width: 100,
	},
});
