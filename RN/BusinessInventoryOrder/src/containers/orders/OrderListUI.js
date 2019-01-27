import React from "react";
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";
import ListItemUI from "./ListItemUI";

type Props = {
	navigation: any,
	orders: any,
	loading: boolean,
	refreshing: boolean,
	noRecordText: string,
	onFetchRefresh: Function,
};

export default function renderOrderList(props: Props) {
	const { navigation, orders, loading, refreshing, noRecordText, onFetchRefresh } = props;
	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <ListItemUI data={item} />}
			keyExtractor={(item, index) => item.id.toString() + index}
			style={styles.listcontainer}
			// ItemSeparatorComponent={renderSeperator}
			// ListHeaderComponent={renderHeader}
			ListFooterComponent={() => renderFooter(loading, refreshing)}
			ListEmptyComponent={() => renderEmpty(loading, noRecordText)}
			onRefresh={onFetchRefresh}
			refreshing={refreshing}
		/>
	);
}

const renderHeader = () => {};
const renderSeperator = () => {};
const renderFooter = (loading: boolean, refreshing: boolean) => {
	return (
		<View style={styles.footer}>
			{loading && !refreshing && (
				<ActivityIndicator size="small" color={Colors.bodyTitleVarient} />
			)}
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

renderOrderList.defaultProps = {};

const styles = StyleSheet.create({
	listcontainer: {
		flex: 1,
	},
	footer: {
		padding: 16,
	},
	empty: {
		alignSelf: "stretch",
		height: 150,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	textNoDocument: {
		color: Colors.bodySecondaryVarient,
	},
});

// paddingHorizontal: ScalePerctFullWidth(10),
// paddingVertical: ScalePerctFullHeight(10),
// backgroundColor: "red",
