import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
// import SubGroupUI from "./SubGroupUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	data: any,
};

export default class SelectedItemUI extends PureComponent<Props> {
	render() {
		const { data } = this.props;
		const { qty, item, is_deleted } = data;
		const textStyle = is_deleted ? { textDecorationLine: "line-through" } : {};
		return (
			<View style={styles.cont}>
				<View style={styles.headerContainer}>
					<Text style={[styles.headerText, textStyle]}>{item.bill_name}</Text>
					<Text style={[styles.avilText, textStyle]}>{qty}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cont: {
		paddingVertical: ScalePerctFullWidth(1),
		paddingLeft: ScalePerctFullWidth(3),
	},
	headerContainer: {
		borderBottomWidth: 0.2,
		borderColor: "#00000020",
		padding: ScalePerctFullWidth(1),
		paddingBottom: ScalePerctFullWidth(3),
		flexDirection: "row",
		alignItems: "center",
	},
	headerText: {
		alignSelf: "center",
		fontSize: 11,
		flex: 1,
		color: Colors.bodySemiTransparent,
	},
	input: {
		height: 35,
		fontSize: 11,
		borderBottomWidth: 1,
		borderColor: Colors.bodyPrimaryVarient,
		padding: 0,
	},
	avilText: {
		width: ScalePerctFullWidth(10),
		fontSize: 11,
		color: Colors.bodyPrimaryVarient,
	},
	cancelBtn: {
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
});
