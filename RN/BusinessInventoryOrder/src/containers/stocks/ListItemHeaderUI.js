import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { ScalePerctFullWidth, Images, Colors } from "../../asset";
import { getDateJson } from "../../utils";

type Props = {
	onOtherDetailsPress: Function,
	created_date: string,
	stock_no: string,
	status: string,
};

const getStatusImage = (status: string) => {
	switch (status) {
		case "CREATED":
		case "EDITED":
			return Images.timeImg;
		case "BILLED":
			return Images.billImg;
		case "SEND":
			return Images.sendImg;
		case "CLOSED":
			return Images.doneImg;
		case "CANCELLED":
			return Images.cancelImg;
		default:
			return Image.timeImg;
	}
};

const getStatusId = (status: string) => {
	switch (status) {
		case "CREATED":
			return 1;
		case "EDITED":
			return 2;
		case "BILLED":
			return 3;
		case "SEND":
			return 4;
		case "CLOSED":
			return 5;
		case "CANCELLED":
			return 6;
		default:
			return 5;
	}
};

function renderButton(label, onPress) {
	return (
		<TouchableOpacity key={label} onPress={onPress} style={styles.otherDetContainer}>
			<Text style={styles.otherDetailText}>{label}</Text>
		</TouchableOpacity>
	);
}

export default function renderListHeaderItem(props: Props) {
	const {
		onOtherDetailsPress,
		onStockPress,
		created_date,
		stock_no,
		status,
		no_of_items,
	} = props;
	const { day, date, month, year } = getDateJson(created_date);
	const noOfItems = `${no_of_items} item${no_of_items > 1 ? "s" : ""} `;
	return (
		<TouchableOpacity onPress={onOtherDetailsPress} style={styles.cont}>
			<View style={styles.dateContainer}>
				<Text style={styles.dayText}>{day}</Text>
				<Text style={styles.dateText}>{date}</Text>
				<Text style={styles.yearText}>{`${month} ${year}`}</Text>
			</View>
			<View style={styles.container}>
				<Text ellipsizeMode="head" numberOfLines={1} style={styles.stockNoText}>
					{stock_no}
				</Text>
				<Text style={styles.noItemsText}>{noOfItems}</Text>
				{renderButton("View", onStockPress)}
			</View>
			{/* <View style={styles.statusContainer}>
				<Image source={getStatusImage(status)} style={styles.statusImg} />
				<Text style={styles.statusText}>{status}</Text>
			</View> */}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	cont: {
		backgroundColor: Colors.bgSemiTransparent,
		borderRadius: 16,
		elevation: 5,
		flexDirection: "row",
		borderColor: Colors.bgPrimaryDark,
		borderWidth: 0.5,
	},
	dateContainer: {
		padding: ScalePerctFullWidth(4),
		backgroundColor: "rgba(0, 145, 234, 0.5)",
		borderTopLeftRadius: 16,
		borderBottomLeftRadius: 16,
		justifyContent: "center",
		paddingVertical: 10,
		paddingRight: 10,
		paddingLeft: 10,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		paddingVertical: 10,
		paddingRight: 5,
		paddingLeft: 10,
	},
	statusContainer: {
		alignItems: "center",
		justifyContent: "center",
		padding: ScalePerctFullWidth(4),
	},
	statusImg: {
		width: ScalePerctFullWidth(6),
		height: ScalePerctFullWidth(6),
		margin: ScalePerctFullWidth(4),
		marginTop: 0,
	},
	dayText: {
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		fontSize: 12,
	},
	dateText: {
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
	},
	yearText: {
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		fontSize: 12,
	},
	stockNoText: {
		color: Colors.bodySecondaryDark,
		fontSize: 14,
		fontWeight: "bold",
	},
	noItemsText: {
		color: Colors.bodySecondaryDark,
		fontSize: 12,
		marginBottom: ScalePerctFullWidth(1),
	},
	otherDetailText: {
		color: Colors.bodyPrimaryLight,
		paddingHorizontal: ScalePerctFullWidth(2),
		fontSize: 11,
	},
	otherDetContainer: {
		paddingVertical: ScalePerctFullWidth(1),
		borderRadius: 4,
		borderColor: Colors.bodySecondaryDark,
		borderWidth: 1,
		alignSelf: "flex-start",
		marginHorizontal: 2,
		marginVertical: 2,
	},
	statusText: {
		color: Colors.bodySecondaryDark,
		fontSize: 11,
	},
});
