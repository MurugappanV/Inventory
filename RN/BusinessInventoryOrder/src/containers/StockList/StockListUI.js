import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Header } from "../header";
import StockListListUI from "./StockListListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Colors, Images } from "../../asset";

type Props = {
	navigation: any,
};

export default class StockListUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Image source={Images.bgImg} style={styles.fullContainer} resizeMode={"cover"} />
				<Header
					title="Stock List"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<StockListListUI {...this.props} />
			</View>
		);
	}
}

StockListUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#00000010",
		// position: "absolute",
		// width: ScalePerctFullWidth(100),
		// height: ScalePerctFullHeight(100),
	},
	btn: {
		padding: ScalePerctFullWidth(1),
		alignSelf: "stretch",
		backgroundColor: "#00000010",
	},
	btnText: {
		color: Colors.bodySecondaryDark,
		alignSelf: "flex-end",
		fontSize: 11,
	},
	fullContainer: {
		position: "absolute",
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
		zIndex: -1,
	},
});
