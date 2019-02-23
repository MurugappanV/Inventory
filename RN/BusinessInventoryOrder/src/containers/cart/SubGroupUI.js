import React, { PureComponent } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import ItemUI from "./ItemUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
	onQtyChanged: Function,
	data: any,
};

export default class SubGroupUI extends PureComponent<Props> {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		const { data, onQtyChanged } = this.props;
		const { name, id, items } = data;
		return (
			<View style={styles.cont}>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>{name}</Text>
				</View>
				<FlatList
					data={items}
					renderItem={({ item }) => <ItemUI data={item} onQtyChanged={onQtyChanged} />}
					keyExtractor={(item, index) => item.id.toString() + index}
					style={styles.listcontainer}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cont: {
		paddingTop: ScalePerctFullWidth(3),
		paddingLeft: ScalePerctFullWidth(3),
	},
	headerContainer: {
		borderBottomWidth: 0.2,
		borderColor: "#00000020",
		padding: ScalePerctFullWidth(1),
	},
	headerText: {
		color: Colors.bodySecondaryDark,
		alignSelf: "flex-start",
		fontSize: 11,
	},
});
