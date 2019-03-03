import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import AddOrderUI from "./AddOrderUI";
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

export default class OrderUI extends PureComponent<Props> {
	render() {
		const { navigation, userType } = this.props;
		return (
			<View style={styles.container}>
				<Header title="Orders" isLogoutEnable navigation={navigation} />
				<OrderListUI {...this.props} />
				{isAdd(userType) && (
					<AddOrderUI
						onPress={() => {
							navigation.navigate("Cart");
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
