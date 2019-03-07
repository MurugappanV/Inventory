import React from "react";
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";
import ListItemUI from "./ListItemUI";

type Props = {
	navigation: any,
	stocks: any,
	loading: boolean,
	refreshing: boolean,
	noRecordText: string,
	onFetchRefresh: Function,
	userType: number,
};

export default function renderStockList(props: Props) {
	const { stocks, loading, refreshing, noRecordText, onFetchRefresh } = props;
	return (
		<FlatList
			data={stocks}
			renderItem={({ item }) => <ListItemUI data={item} {...props} />}
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

renderStockList.defaultProps = {};

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
