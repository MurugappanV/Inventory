import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Picker, TextInput, Image, TouchableOpacity } from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
	data: any,
};

const UserTypes = {
	4: "Viewer",
	1: "Admin",
	2: "Manager",
	3: "Sales Person",
};

export default class UserItemUI extends PureComponent<Props> {
	render() {
		const { data, onPress } = this.props;
		console.log("dat a ", data);
		return (
			<View onPress={() => onPress(data.id)} style={styles.cont}>
				<Text style={styles.headerText}>{data.name}</Text>
				<Text style={styles.avilText}>{data.password}</Text>
				<Text style={styles.avilText}>{data.email}</Text>
				<Picker
					selectedValue={data.user_type}
					style={styles.picker}
					onValueChange={(itemValue: number) =>
						onPress(data.id, itemValue, data.name, UserTypes[itemValue])
					}
					itemStyle={styles.pickerItem}
					prompt={"Select user type"}
				>
					<Picker.Item label="Viewer" value={4} />
					<Picker.Item label="Admin" value={1} />
					<Picker.Item label="Manager" value={2} />
					<Picker.Item label="Sales Person" value={3} />
				</Picker>
			</View>
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
		color: Colors.bodyPrimaryDark,
	},
	avilText: {
		fontSize: 11,
	},
	cancelBtn: {
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	picker: {
		height: 40,
		width: 200,
		padding: 0,
	},
	pickerItem: {
		fontSize: 11,
	},
});
