import React from "react";
import { StatusBar, StyleSheet, View, Text } from "react-native";
import { Colors, Images, ScalePerctFullHeight, ScalePerctFullWidth, Metrics } from "../../asset";
import { ImageBtn } from "../../components";

type Props = {
	title: string,
	style?: number | Object | Array<number>,
	onLogout?: Function,
	onBack?: Function,
	isLogoutEnable?: boolean,
};

export default function HeaderUI(props: Props) {
	const { onBack, onLogout, isLogoutEnable, title, style } = props;
	return (
		<View>
			<StatusBar backgroundColor={Colors.bgSecondaryDark} barStyle="light-content" />
			<View style={StyleSheet.flatten([styles.container, style])}>
				{!!onBack && (
					<ImageBtn
						style={styles.back}
						imgStyle={styles.backImage}
						source={Images.backImg}
						onPress={onBack}
					/>
				)}
				{!onBack && <View style={styles.emptyView} />}
				<View style={styles.textView}>
					<Text style={styles.title}>{title}</Text>
				</View>
				{!!isLogoutEnable && (
					<ImageBtn
						style={styles.logout}
						imgStyle={styles.logoutImage}
						source={Images.logoutImg}
						onPress={onLogout}
					/>
				)}
				{!isLogoutEnable && <View style={styles.emptyView} />}
			</View>
		</View>
	);
}

HeaderUI.defaultProps = {
	style: undefined,
	isLogoutEnable: false,
	onLogout: undefined,
	onBack: undefined,
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
		backgroundColor: Colors.bgPrimaryDark,
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(8),
		elevation: 10,
	},
	emptyView: {
		width: ScalePerctFullWidth(5),
		paddingLeft: Metrics.DEFAULT_PADDING,
		paddingRight: Metrics.DEFAULT_PADDING,
	},
	title: {
		color: Colors.bodyPrimaryLight,
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 17,
		fontWeight: "bold",
		letterSpacing: 0.5,
	},
	textView: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		alignSelf: "stretch",
	},
	back: {
		alignSelf: "stretch",
		padding: 0,
		paddingLeft: Metrics.DEFAULT_PADDING,
		paddingRight: Metrics.DEFAULT_PADDING,
	},
	backImage: {
		width: ScalePerctFullWidth(5),
		height: ScalePerctFullWidth(5),
		tintColor: Colors.bodyPrimaryLight,
	},
	logoutImage: {
		width: ScalePerctFullWidth(4),
		height: ScalePerctFullWidth(4),
		tintColor: Colors.bodyPrimaryLight,
	},
	logout: {
		alignSelf: "stretch",
		padding: 0,
		paddingLeft: Metrics.DEFAULT_PADDING,
		paddingRight: Metrics.DEFAULT_PADDING,
	},
});
