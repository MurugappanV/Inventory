import React from "react";
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";
import SubGroupUI from "./SubGroupUI";

type Props = {
	sub_groups: any,
	onQtyChanged: Function,
};

export default function renderSubGroupList(props: Props) {
	const { sub_groups, onQtyChanged } = props;
	return (
		<FlatList
			data={sub_groups}
			renderItem={({ item }) => <SubGroupUI data={item} onQtyChanged={onQtyChanged} />}
			keyExtractor={(item, index) => item.id.toString() + index}
			style={styles.listcontainer}
		/>
	);
}

renderSubGroupList.defaultProps = {};

const styles = StyleSheet.create({
	listcontainer: {
		flex: 1,
	},
});
