import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";
import { getDateJson } from "../../utils";

type Props = {
	onOtherDetailsPress: Function,
	created_date: string,
	order_no: string,
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

export default function renderListHeaderItem(props: Props) {
	const { onOtherDetailsPress, created_date, order_no, status, no_of_items } = props;
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
				<Text ellipsizeMode="head" numberOfLines={1} style={styles.orderNoText}>
					{order_no}
				</Text>
				<Text style={styles.noItemsText}>{noOfItems}</Text>
				<TouchableOpacity onPress={onOtherDetailsPress} style={styles.otherDetContainer}>
					<Text style={styles.otherDetailText}>{"other details"}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.statusContainer}>
				<Image source={getStatusImage(status)} style={styles.statusImg} />
				<Text style={styles.statusText}>{status}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	cont: {
		backgroundColor: "white",
		borderRadius: 16,
		elevation: 5,
		flexDirection: "row",
	},
	dateContainer: {
		padding: ScalePerctFullWidth(4),
		backgroundColor: Colors.bgPrimaryDark,
		borderTopLeftRadius: 16,
		borderBottomLeftRadius: 16,
		justifyContent: "center",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		padding: ScalePerctFullWidth(4),
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
	orderNoText: {
		color: Colors.bodySecondaryDark,
		fontSize: 16,
		fontWeight: "bold",
	},
	noItemsText: {
		color: Colors.bodySecondaryDark,
		fontSize: 14,
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
		backgroundColor: Colors.bodySecondaryDark,
		alignSelf: "flex-start",
	},
	statusText: {
		color: Colors.bodySecondaryDark,
		fontSize: 14,
	},
});
