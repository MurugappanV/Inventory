import React, { PureComponent } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Header } from "../header";
import SelectedUI from "./SelectedUI";
import CartListUI from "./CartListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images } from "../../asset";

type Props = {
	navigation: any,
	orderId: number,
	retailerId: number,
	otherDetails: string,
	selected: any,
	items: any,
	deletedItems: any,
	onItemUnSelected: Function,
	onQtyChanged: Function,
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
			items,
			onItemUnSelected,
			otherDetails,
			deletedItems,
			onQtyChanged,
		} = this.props;
		return (
			<View style={styles.container}>
				<Image source={Images.bgImg} style={styles.fullContainer} resizeMode={"cover"} />
				<Header
					title="Add Order"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<CartListUI {...this.props} />
				{/* <AddOrderUI onPress={() => {}} /> */}
				{items.length > 0 && selected.size > 0 && (
					<SelectedUI
						isDefaultOpen={!!orderId}
						selected={selected}
						deletedItems={deletedItems}
						onOrder={() => this.onOrder(navigation, orderId, retailerId, otherDetails)}
						onItemUnSelected={onItemUnSelected}
						onQtyChanged={onQtyChanged}
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
	fullContainer: {
		position: "absolute",
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
		zIndex: -1,
	},
});
