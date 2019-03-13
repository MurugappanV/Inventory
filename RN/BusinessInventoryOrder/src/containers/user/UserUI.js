import React, { PureComponent } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Header } from "../header";
import CustomerListUI from "./UserListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Colors } from "../../asset";
import { Button } from "../../components";

type Props = {
	navigation: any,
	onAddUser: Function,
};

export default class UserUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	render() {
		const {
			navigation,
			onAddUser,
		} = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Users"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<CustomerListUI {...this.props} />
				<Button
					style={styles.orderBtn}
					title="Add User"
					onPress={() => onAddUser()}
				/>
			</View>
		);
	}
}

UserUI.defaultProps = {};

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
