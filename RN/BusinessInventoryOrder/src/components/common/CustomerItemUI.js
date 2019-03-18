import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
// import SubGroupUI from "./SubGroupUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
	data: any,
};

export default class CustomerItemUI extends PureComponent<Props> {
	render() {
		const { data, onPress } = this.props;
		console.log("dat a ", data);
		return (
			<TouchableOpacity onPress={() => onPress(data.id)} style={styles.cont}>
				<Text style={styles.headerText}>{data.name}</Text>
				<Text style={styles.avilText}>
					{data.address && data.address.split(";").join("\n")}
				</Text>
				<Text style={styles.avilText}>{data.phone_no}</Text>
				<Text style={styles.avilText}>{`GST ${data.gstin_no}`}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	cont: {
		paddingVertical: ScalePerctFullWidth(3),
		marginHorizontal: ScalePerctFullWidth(3),
		borderBottomWidth: 1,
		borderColor: Colors.bgSecondaryLight,
	},
	headerText: {
		alignSelf: "flex-start",
		fontSize: 14,
		fontWeight: "bold",
		color: Colors.bodySecondaryDark,
	},
	avilText: {
		fontSize: 11,
		color: Colors.bodySemiTransparent,
	},
	cancelBtn: {
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
});
