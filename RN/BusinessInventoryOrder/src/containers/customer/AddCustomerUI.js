import React, { PureComponent } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { TextField } from "react-native-material-textfield";
import { Button } from "../../components";
import { Header } from "../header";
import { ScalePerctFullHeight, ScalePerctFullWidth, Colors } from "../../asset";

type Props = {
	name: string,
	phone: string,
	address: string,
	gst: string,
	onNameInputChange: Function,
	onPhoneInputChange: Function,
	onAddressInputChange: Function,
	onAddCustomer: Function,
	onGstInputChange: Function,
	loading: boolean,
	navigation: any,
};

export default class AddCustomerUI extends PureComponent<Props> {
	render() {
		const {
			name,
			phone,
			gst,
			address,
			onNameInputChange,
			onPhoneInputChange,
			onAddressInputChange,
			onAddCustomer,
			onGstInputChange,
			loading,
			navigation,
		} = this.props;
		return (
			<View>
				<Header
					title="New Customer"
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
					/>
					<TextField
						ref={(component: any) => {
							this.textInput = component;
						}}
						returnKeyType="next"
						onSubmitEditing={() => this.textInput2.focus()}
						label="Enter phone number"
						value={phone}
						onChangeText={input => onPhoneInputChange(input)}
					/>
					<TextField
						ref={(component: any) => {
							this.textInput2 = component;
						}}
						returnKeyType="next"
						onSubmitEditing={() => this.textInput3.focus()}
						label="GST number"
						value={gst}
						onChangeText={input => onGstInputChange(input)}
					/>
					<Text style={styles.otherDetailsText}>{"Any other details"}</Text>
					<TextInput
						ref={(component: any) => {
							this.textInput3 = component;
						}}
						returnKeyType="done"
						multiline
						label="Enter address"
						style={styles.otherDetailsInput}
						onChangeText={input => onAddressInputChange(input)}
						value={address}
						onSubmitEditing={() => {}}
					/>
				</View>
				<Button
					style={styles.loginBtn}
					title="ADD"
					onPress={onAddCustomer}
					loading={loading}
				/>
			</View>
		);
	}
}

AddCustomerUI.defaultProps = {};

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
});
