import React, { PureComponent } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Header } from "../header";
import AddOrderUI from "./AddOrderUI";
import StockBtnUI from "./StockBtnUI";
import OrderListUI from "./OrderListUI";
import { Images, ScalePerctFullWidth, ScalePerctFullHeight, Colors } from "../../asset";

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
				<Image source={Images.bgImg} style={styles.fullContainer} resizeMode={"cover"} />
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
	fullContainer: {
		position: "absolute",
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
		zIndex: -1,
	},
});
