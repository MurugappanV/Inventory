import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors, UserType } from "../../asset";
import { getDateJson } from "../../utils";

type Props = {
	onOtherDetailsPress: Function,
	created_date: string,
	order_no: string,
	status: string,
	userType: number,
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

const userButtons = {
	[UserType.admin]: ["View", "Edit", "Bill", "Send", "Close", "Cancel"],
	[UserType.manager]: ["View", "Bill", "Send"],
	[UserType.seller]: ["View", "Edit", "Cancel"],
};

function renderButtons(props) {
	const { status, userType, onOrderPress } = props;
	const statusId = getStatusId(status);
	return (
		<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
			{userButtons[userType] &&
				userButtons[userType].map((btn: string) => {
					if (btn === "Edit" && statusId < 3) {
						return renderButton(btn, () => onOrderPress(2));
					}
					if (btn === "View") {
						return renderButton(btn, () => onOrderPress(1));
					}
					if (btn === "Bill" && statusId < 3) {
						return renderButton(btn, () => onOrderPress(3));
					}
					if (btn === "Send" && statusId === 3) {
						return renderButton(btn, () => onOrderPress(4));
					}
					if (btn === "Close" && statusId === 4) {
						return renderButton(btn, () => onOrderPress(5));
					}
					if (btn === "Cancel" && statusId < 4) {
						return renderButton(btn, () => onOrderPress(6));
					}
					return null;
				})}
		</View>
	);
}

export default function renderListHeaderItem(props: Props) {
	const {
		onOtherDetailsPress,
		onOrderPress,
		created_date,
		order_no,
		status,
		userType,
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
				<Text ellipsizeMode="head" numberOfLines={1} style={styles.orderNoText}>
					{order_no}
				</Text>
				<Text style={styles.noItemsText}>{noOfItems}</Text>
				{renderButtons(props)}
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
		marginHorizontal: 2,
		marginVertical: 2,
	},
	statusText: {
		color: Colors.bodySecondaryDark,
		fontSize: 14,
	},
});
