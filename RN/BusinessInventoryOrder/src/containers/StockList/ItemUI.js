import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
// import SubGroupUI from "./SubGroupUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
	data: any,
};

export default class ItemUI extends PureComponent<Props> {
	render() {
		const { data } = this.props;
		const { id, name, available, bill_name } = data;
		return (
			<View style={styles.cont}>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>{name}</Text>
					<Text style={styles.avilText}>{available}</Text>
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
		color: Colors.bodySemiTransparent,
	},
	avilText: {
		width: ScalePerctFullWidth(10),
		fontSize: 11,
		color: Colors.bodyPrimaryVarient,
	},
});
