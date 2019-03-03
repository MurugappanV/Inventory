import React, { PureComponent } from "react";
import {
	StyleSheet,
	FlatList,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Text,
	Platform,
	Keyboard,
} from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";
import SelectedItemUI from "./SelectedItemUI";
import { Button } from "../../components";

type Props = {
	onCancel: Function,
	selected: any,
	onOrder: Function,
	onItemUnSelected: Function,
};

const initialBottom = (Platform.OS == "android" && Platform.Version < 21 ? 0 : 0) * -1;

export default class renderSelectedUI extends PureComponent<Props> {
	constructor() {
		super();
		this.state = { isOpen: false };
	}

	toggleOpen = () => {
		Keyboard.dismiss();
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		const { onItemUnSelected, onOrder, selected } = this.props;
		const { isOpen } = this.state;

		return (
			<View
				style={[
					styles.container,
					isOpen
						? { bottom: initialBottom }
						: { bottom: (ScalePerctFullHeight(100) - 74) * -1 },
				]}
			>
				<View style={styles.headerContainer}>
					<Text style={styles.headerSelected}>{`Selected ${selected.size} item${
						selected.size > 1 ? "s" : ""
					}`}</Text>
					<TouchableOpacity onPress={() => this.toggleOpen()} style={styles.btn}>
						<Text style={styles.headerClose}>{isOpen ? "close" : "open"}</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					data={Array.from(selected.entries())}
					renderItem={({ item }) => (
						<SelectedItemUI data={item} onPress={onItemUnSelected} />
					)}
					keyExtractor={(item, index) => item[0].toString() + index}
					style={styles.listcontainer}
					// ItemSeparatorComponent={renderSeperator}
					// ListHeaderComponent={renderHeader}
					// ListFooterComponent={() => renderFooter(loading)}
					// ListEmptyComponent={() => renderEmpty(loading, noRecordText)}
					// onRefresh={onFetchRefresh}
					// refreshing={refreshing}
				/>
				<Button style={styles.orderBtn} title="ORDER" onPress={() => onOrder()} />
			</View>
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
		height: ScalePerctFullHeight(100) - 24,
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
