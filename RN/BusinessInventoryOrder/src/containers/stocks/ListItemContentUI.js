import React from "react";
import { StyleSheet, FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";
import { getDateddmmyy } from "../../utils";

type Props = {
	retailer: any,
	other_details: string,
	logs: any,
};

const getStatusLog = (status: string) => {
	switch (status) {
		case "CREATE_ORDER":
			return "Creader by ";
		case "EDIT_ORDER":
			return "Edited by ";
		case "BILL_ORDER":
			return "Billed by ";
		case "SEND_ORDER":
			return "Send by ";
		case "CLOSE_ORDER":
			return "Closed by ";
		case "CANCEL_ORDER":
			return "Cancelled by ";
		default:
			return "Action by ";
	}
};

// const renderLogs = (logs: any) => {
// 	return (
// 		<FlatList
// 			data={logs}
// 			renderItem={({ item }) => {
// 				const logText = `${getStatusLog(item.action)}${item.name}`;
// 				return (
// 					<View style={styles.logContainer}>
// 						<Text style={styles.logbyText}>{logText}</Text>
// 						<Text style={styles.logdateText}>{getDateddmmyy(item.date)}</Text>
// 					</View>
// 				);
// 			}}
// 			keyExtractor={(item, index) => item.id.toString()}
// 			style={styles.listcontainer}
// 			// ItemSeparatorComponent={renderSeperator}
// 			// ListHeaderComponent={renderHeader}
// 			// ListFooterComponent={() => renderFooter(loading, refreshing)}
// 			// ListEmptyComponent={() => renderEmpty(loading, noRecordText)}
// 			// onRefresh={onFetchRefresh}
// 			// refreshing={refreshing}
// 		/>
// 	);
// };

export default function renderListContentItem(props: Props) {
	const { other_details, name } = props;
	return (
		<View style={styles.cont}>
			<View style={styles.addressContainer}>
				{/* <View style={styles.deliveryAddsContainer}>
					<Text style={styles.addressTitleText}>{"Delivery address"}</Text>
					<Text style={styles.addressText}>{disAddress}</Text>
				</View> */}
				<View style={styles.detailContainer}>
					<Text style={styles.addressTitleText}>{"Other details"}</Text>
					<Text style={styles.addressText}>{other_details || "-"}</Text>
				</View>
			</View>
			<View style={styles.logContainer}>
				<Text style={styles.logbyText}>{`created by ${name}`}</Text>
				{/* <Text style={styles.logdateText}>{getDateddmmyy(item.date)}</Text> */}
			</View>
			{/* {renderLogs(logs)} */}
		</View>
	);
}

const styles = StyleSheet.create({
	cont: {
		paddingVertical: ScalePerctFullWidth(2),
		paddingLeft: ScalePerctFullWidth(4),
	},
	addressContainer: {
		borderRadius: 8,
		padding: 10,
		elevation: 5,
		flexDirection: "row",
		borderColor: Colors.bgSecondaryLight,
		borderWidth: 0.5,
	},
	deliveryAddsContainer: {
		flex: 1,
		borderRightWidth: 1,
		borderColor: Colors.bgSemiTransparent,
		paddingRight: ScalePerctFullWidth(4),
	},
	detailContainer: {
		flex: 1,
		// paddingLeft: ScalePerctFullWidth(4),
	},
	addressTitleText: {
		color: Colors.bodySecondaryDark,
		fontSize: 13,
	},
	addressText: {
		fontSize: 13,
		color: Colors.bodySemiTransparent,
	},
	phoneNoText: {
		fontSize: 13,
	},
	logContainer: {
		borderColor: Colors.bgSecondaryLight,
		borderWidth: 0.5,
		borderRadius: 8,
		elevation: 2,
		flexDirection: "row",
		paddingHorizontal: 10,
		paddingVertical: 5,
		justifyContent: "space-between",
		marginTop: 2,
	},
	logbyText: {
		color: Colors.bodySecondaryDark,
		fontSize: 13,
	},
	logdateText: {
		color: Colors.bodySemiTransparent,
		fontSize: 13,
		paddingLeft: 10,
	},
	listcontainer: {},
});
