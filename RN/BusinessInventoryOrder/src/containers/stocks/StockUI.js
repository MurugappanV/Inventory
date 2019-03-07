import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import AddStockUI from "./AddStockUI";
import StockListUI from "./StockListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors, UserType } from "../../asset";

type Props = {
	navigation: any,
	userType: number,
};

function isAdd(userType) {
	if (userType === UserType.admin || userType === UserType.manager) {
		return true;
	}
	return false;
}

export default class StockUI extends PureComponent<Props> {
	render() {
		const { navigation, userType } = this.props;
		return (
			<View style={styles.container}>
				<Header title="Stocks" isLogoutEnable navigation={navigation} />
				<StockListUI {...this.props} />
				{isAdd(userType) && (
					<AddStockUI
						onPress={() => {
							// navigation.navigate("Cart");
						}}
					/>
				)}
			</View>
		);
	}
}

StockUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
