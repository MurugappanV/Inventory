import React, { PureComponent } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Header } from "../header";
import SelectedUI from "./ViewSelectedUI";
import { CustomerItemUI } from "../../components";
import { ScalePerctFullWidth, ScalePerctFullHeight, Images } from "../../asset";

type Props = {
	navigation: any,
	orderData: any,
};

export default class CartUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	render() {
		const { navigation, orderData } = this.props;
		return (
			<View style={styles.container}>
				<Image source={Images.bgImg} style={styles.fullContainer} resizeMode={"stretch"} />
				<Header
					title="Order Items"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				{orderData && <CustomerItemUI data={orderData.retailer} onPress={() => {}} />}
				<SelectedUI {...this.props} />
			</View>
		);
	}
}

CartUI.defaultProps = {};

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
