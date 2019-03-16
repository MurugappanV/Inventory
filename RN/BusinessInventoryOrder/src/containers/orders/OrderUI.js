import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import AddOrderUI from "./AddOrderUI";
import StockBtnUI from "./StockBtnUI";
import OrderListUI from "./OrderListUI";

type Props = {
	navigation: any,
	permissions: any,
};

export default class OrderUI extends PureComponent<Props> {
	onSettings = () => {
		const { navigation } = this.props;
		navigation.navigate("Users");
	};

	render() {
		const { navigation, permissions } = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Orders"
					isLogoutEnable
					navigation={navigation}
					onSettings={permissions.user.view ? this.onSettings : undefined}
				/>
				<OrderListUI {...this.props} />
				{permissions.order.add && (
					<AddOrderUI
						onPress={() => {
							navigation.navigate("Cart");
						}}
					/>
				)}
				{permissions.stock.view && (
					<StockBtnUI
						onPress={() => {
							navigation.navigate("Stocks");
						}}
						style={permissions.order.add ? { bottom: 90 } : { bottom: 20 }}
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
