import React, { PureComponent } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Header } from "../header";
import SelectedUI from "./ViewSelectedUI";
import { Images, ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";

type Props = {
	navigation: any,
};

export default class ViewStockUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Image source={Images.bgImg} style={styles.fullContainer} resizeMode={"cover"} />
				<Header
					title="Stock Items"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<SelectedUI {...this.props} />
			</View>
		);
	}
}

ViewStockUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// position: "absolute",
		// width: ScalePerctFullWidth(100),
		// height: ScalePerctFullHeight(100),
	},
	fullContainer: {
		position: "absolute",
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
		zIndex: -1,
	},
});
