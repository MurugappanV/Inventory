import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import AddOrderUI from "./AddOrderUI";
import StockBtnUI from "./StockBtnUI";
import OrderListUI from "./OrderListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors, UserType } from "../../asset";

type Props = {
	navigation: any,
	userType: number,
};

function isAdd(userType) {
	if (userType === UserType.admin || userType === UserType.seller) {
		return true;
	}
	return false;
}

function isStock(userType) {
	if (userType === UserType.admin || userType === UserType.manager) {
		return true;
	}
	return false;
}

function isSettings(userType) {
	if (userType === UserType.admin) {
		return true;
	}
	return false;
}

export default class OrderUI extends PureComponent<Props> {
	onSettings = () => {
		const { navigation } = this.props;
		navigation.navigate("Users");
	};

	render() {
		const { navigation, userType } = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Orders"
					isLogoutEnable
					navigation={navigation}
					onSettings={isSettings(userType) ? this.onSettings : undefined}
				/>
				<OrderListUI {...this.props} />
				{isAdd(userType) && (
					<AddOrderUI
						onPress={() => {
							navigation.navigate("Cart");
						}}
					/>
				)}
				{isStock(userType) && (
					<StockBtnUI
						onPress={() => {
							navigation.navigate("Stocks");
						}}
					/>
				)}
			</View>
		);
	}
}

OrderUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
