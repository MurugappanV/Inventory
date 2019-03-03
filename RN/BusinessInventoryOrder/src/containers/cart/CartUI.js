import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import SelectedUI from "./SelectedUI";
import CartListUI from "./CartListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";

type Props = {
	navigation: any,
	orderId: number,
	retailerId: number,
	otherDetails: string,
	selected: any,
	deletedItems: any,
	onItemUnSelected: Function,
};

export default class CartUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	onOrder = (navigation: any, orderId: number, retailerId: number, otherDetails: string) => {
		navigation.navigate("Customers", { id: orderId, retailerId, otherDetails });
	};

	render() {
		const {
			navigation,
			orderId,
			retailerId,
			selected,
			onItemUnSelected,
			otherDetails,
			deletedItems,
		} = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Add Order"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<CartListUI {...this.props} />
				{/* <AddOrderUI onPress={() => {}} /> */}
				{selected.size > 0 && (
					<SelectedUI
						selected={selected}
						deletedItems={deletedItems}
						onOrder={() => this.onOrder(navigation, orderId, retailerId, otherDetails)}
						onItemUnSelected={onItemUnSelected}
					/>
				)}
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
