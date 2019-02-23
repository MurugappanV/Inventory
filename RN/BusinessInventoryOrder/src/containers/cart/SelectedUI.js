import React, { PureComponent } from "react";
import {
	StyleSheet,
	FlatList,
	View,
	TouchableOpacity,
	ActivityIndicator,
	Text,
} from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";
import GroupUI from "./GroupUI";

type Props = {
	onCancel: Function,
	itemList: any,
	onConfirm: Function,
};

export default class renderSelectedUI extends PureComponent<Props> {
	constructor() {
		super();
		this.state = { isOpen: false };
	}

	toggleOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		const { onCancel, itemList, onConfirm } = this.props;
		const { isOpen } = this.state;
		return (
			<View
				style={[
					styles.container,
					isOpen
						? { bottom: ScalePerctFullHeight(0) }
						: { bottom: ScalePerctFullHeight(90) * -1 },
				]}
			>
				<TouchableOpacity
					onPress={() => this.toggleOpen()}
					style={styles.headerContainer}
				/>
				{/* <FlatList
					data={itemList}
					renderItem={({ item }) => <GroupUI data={item} onQtyChanged={onQtyChanged} />}
					keyExtractor={(item, index) => item.id.toString() + index}
					style={styles.listcontainer}
					// ItemSeparatorComponent={renderSeperator}
					// ListHeaderComponent={renderHeader}
					ListFooterComponent={() => renderFooter(loading)}
					ListEmptyComponent={() => renderEmpty(loading, noRecordText)}
					// onRefresh={onFetchRefresh}
					// refreshing={refreshing}
				/> */}
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
		height: ScalePerctFullHeight(100),
		zIndex: 1000,
		borderTopColor: Colors.bgPrimaryDark,
		borderBottomColor: Colors.bgPrimaryDark,
		borderWidth: 1,
		elevation: 15,
	},
	headerContainer: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(10),
		backgroundColor: "#12345678",
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
});

// paddingHorizontal: ScalePerctFullWidth(10),
// paddingVertical: ScalePerctFullHeight(10),
// backgroundColor: "red",
