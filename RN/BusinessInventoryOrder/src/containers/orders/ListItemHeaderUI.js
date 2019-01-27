import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Images, Colors } from "../../asset";
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
	const { onOtherDetailsPress, created_date, order_no, status } = props;
	const { day, date, month, year } = getDateJson(created_date);
	return (
		<TouchableOpacity onPress={onOtherDetailsPress} style={styles.cont}>
			<View style={styles.dateContainer}>
				<Text style={styles.dayText}>{day}</Text>
				<Text style={styles.dateText}>{date}</Text>
				<Text style={styles.yearText}>{`${month} ${year}`}</Text>
			</View>
			<View style={styles.container}>
				<Text style={styles.orderNoText}>{order_no}</Text>
				<Text style={styles.noItemsText}>{"no of items"}</Text>
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
		padding: 16,
		backgroundColor: Colors.bgPrimaryDark,
		borderTopLeftRadius: 16,
		borderBottomLeftRadius: 16,
		justifyContent: "center",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 16,
	},
	statusContainer: {
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
	},
	statusImg: {
		width: 20,
		height: 20,
		margin: 16,
		marginTop: 0,
	},
	dayText: {
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		fontSize: 14,
	},
	dateText: {
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
	},
	yearText: {
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		fontSize: 14,
	},
	orderNoText: {
		color: Colors.bodySecondaryDark,
		fontSize: 20,
		fontWeight: "bold",
	},
	noItemsText: {
		color: Colors.bodySecondaryDark,
		fontSize: 14,
	},
	otherDetailText: {
		color: Colors.bodySecondaryDark,
		fontSize: 14,
	},
	otherDetContainer: {
		paddingVertical: 10,
	},
	statusText: {
		color: Colors.bodySecondaryDark,
		fontSize: 14,
	},
});
