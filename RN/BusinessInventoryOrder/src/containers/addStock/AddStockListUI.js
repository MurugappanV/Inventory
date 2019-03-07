import React from "react";
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";
import GroupUI from "./GroupUI";

type Props = {
	items: any,
	selected: any,
	loading: boolean,
	noRecordText: string,
	onQtyChanged: Function,
};

export default function renderAddStockList(props: Props) {
	const { items, loading, selected, noRecordText, onQtyChanged } = props;
	return (
		<FlatList
			data={items}
			extraData={selected}
			renderItem={({ item }) => (
				<GroupUI data={item} onQtyChanged={onQtyChanged} selected={selected} />
			)}
			keyExtractor={(item, index) => item.id.toString() + index}
			style={styles.listcontainer}
			// ItemSeparatorComponent={renderSeperator}
			// ListHeaderComponent={renderHeader}
			ListFooterComponent={() => renderFooter(loading)}
			ListEmptyComponent={() => renderEmpty(loading, noRecordText)}
			// onRefresh={onFetchRefresh}
			// refreshing={refreshing}
		/>
	);
}

const renderHeader = () => {};
const renderSeperator = () => {};
const renderFooter = (loading: boolean) => {
	return (
		<View style={styles.footer}>
			{loading && <ActivityIndicator size="small" color={Colors.bodyTitleVarient} />}
		</View>
	);
};
const renderEmpty = (loading: boolean, noRecordText: string) => {
	if (!loading) {
		return (
			<View style={styles.empty}>
				<Text style={styles.textNoDocument}>{noRecordText}</Text>
			</View>
		);
	}
	return null;
};

renderAddStockList.defaultProps = {};

const styles = StyleSheet.create({
	listcontainer: {
		flex: 1,
		backgroundColor: "#00000010",
	},
	footer: {
		padding: ScalePerctFullHeight(10),
	},
	empty: {
		alignSelf: "stretch",
		height: 150,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: ScalePerctFullWidth(10),
	},
	textNoDocument: {
		color: Colors.bodySecondaryVarient,
	},
});

// paddingHorizontal: ScalePerctFullWidth(10),
// paddingVertical: ScalePerctFullHeight(10),
// backgroundColor: "red",
