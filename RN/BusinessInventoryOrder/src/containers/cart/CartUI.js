import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import SelectedUI from "./SelectedUI";
import CartListUI from "./CartListUI";
// import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	navigation: any,
};

export default class CartUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Add Order"
					isLogoutEnable
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<CartListUI {...this.props} />
				{/* <AddOrderUI onPress={() => {}} /> */}
				<SelectedUI />
			</View>
		);
	}
}

CartUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
