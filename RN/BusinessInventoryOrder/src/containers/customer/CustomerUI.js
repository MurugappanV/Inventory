import React, { PureComponent } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Header } from "../header";
import CustomerListUI from "./CustomerListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Colors } from "../../asset";
import { Button } from "../../components";
import CustomerItemUI from "./CustomerItemUI";

type Props = {
	navigation: any,
	onAddCustomer: Function,
	onConfirm: Function,
	onItemSelected: Function,
	customerId: number,
	customers: any,
	otherDetails: string,
	onOtherDetailsChange: Function,
};

export default class CartUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	renderConfirm = (
		customer: any,
		otherDetails: string,
		onConfirm: Function,
		onItemSelected: Function,
		onOtherDetailsChange: Function,
	) => {
		return (
			<TouchableOpacity
				onPress={() => onItemSelected(null)}
				style={styles.confirmAbsoluteContainer}
			>
				<TouchableOpacity onPress={() => {}} style={styles.confirmContainer}>
					<CustomerItemUI data={customer} onPress={() => {}} />
					<Text style={styles.otherDetailsText}>{"Any other details"}</Text>
					<TextInput
						multiline
						style={styles.otherDetailsInput}
						onChangeText={(textChange: string) => onOtherDetailsChange(textChange)}
						value={otherDetails}
					/>
					<Button style={styles.orderBtn} title="Confirm" onPress={() => onConfirm()} />
				</TouchableOpacity>
			</TouchableOpacity>
		);
	};

	render() {
		const {
			navigation,
			onAddCustomer,
			customerId,
			customers,
			onConfirm,
			onItemSelected,
			otherDetails,
			onOtherDetailsChange,
		} = this.props;
		console.log("customerId ", customerId, customers);
		const customer =
			customerId && customers.length > 0
				? customers.find(obj => obj.id == customerId)
				: undefined;
		console.log("customer", customer);
		return (
			<View style={styles.container}>
				<Header
					title="Select Customer"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<CustomerListUI {...this.props} />
				<Button
					style={styles.orderBtn}
					title="Add Customer"
					onPress={() => onAddCustomer()}
				/>
				{customer &&
					this.renderConfirm(
						customer,
						otherDetails,
						onConfirm,
						onItemSelected,
						onOtherDetailsChange,
					)}
			</View>
		);
	}
}

CartUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// position: "absolute",
		// width: ScalePerctFullWidth(100),
		// height: ScalePerctFullHeight(100),
	},
	orderBtn: {
		alignSelf: "stretch",
		width: "100%",
	},
	confirmAbsoluteContainer: {
		...StyleSheet.absoluteFill,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.bgSemiTransparent,
		zIndex: 10,
	},
	confirmContainer: {
		width: "80%",
		backgroundColor: Colors.bgPrimaryLight,
		padding: 20,
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
