import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import AddOrderUI from "./AddOrderUI";
import OrderListUI from "./OrderListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	navigation: any,
};

export default class OrderUI extends PureComponent<Props> {
	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Header title="Orders" isLogoutEnable navigation={navigation} />
				<OrderListUI {...this.props} />
				<AddOrderUI onPress={() => {}} />
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
