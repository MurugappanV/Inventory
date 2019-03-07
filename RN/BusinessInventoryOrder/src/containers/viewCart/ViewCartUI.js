import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import SelectedUI from "./ViewSelectedUI";
import { CustomerItemUI } from "../../components";

type Props = {
	navigation: any,
};

export default class CartUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	render() {
		const { navigation, orderData } = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Order Items"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<CustomerItemUI data={orderData.retailer} onPress={() => {}} />
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
});
