import React, { PureComponent } from "react";
import {
	StyleSheet,
	FlatList,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Text,
	Platform,
} from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";
import SelectedItemUI from "./SelectedItemUI";
import { Button } from "../../components";

type Props = {
	items: any,
	loading: boolean,
	noRecordText: string,
};

export default class renderSelectedUI extends PureComponent<Props> {
	render() {
		const { loading, noRecordText, items } = this.props;
		return (
			<FlatList
				data={items}
				renderItem={({ item }) => <SelectedItemUI data={item} onPress={() => {}} />}
				keyExtractor={(item, index) => `${item.id}`}
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

renderSelectedUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		left: 0,
		right: 0,
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
		zIndex: 1000,
		backgroundColor: Colors.bgPrimaryLight,
		elevation: 15,
	},
	headerContainer: {
		width: ScalePerctFullWidth(100),
		height: 50,
		backgroundColor: Colors.bgPrimaryDark,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		alignItems: "center",
	},
	headerSelected: {
		color: Colors.bodyPrimaryLight,
		fontSize: 14,
	},
	headerClose: {
		color: Colors.bodyPrimaryLight,
		fontSize: 12,
	},
	listcontainer: {
		flex: 1,
		backgroundColor: "#00000010",
		paddingTop: 10,
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
	orderBtn: {
		alignSelf: "stretch",
		width: "100%",
	},
	btn: {
		padding: 15,
	},
});

// paddingHorizontal: ScalePerctFullWidth(10),
// paddingVertical: ScalePerctFullHeight(10),
// backgroundColor: "red",
