import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import SelectedUI from "./SelectedUI";
import AddStockListUI from "./AddStockListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";

type Props = {
	navigation: any,
	orderId: number,
	retailerId: number,
	otherDetails: string,
	selected: any,
	deletedItems: any,
	onItemUnSelected: Function,
	onAddStock: Function,
};

export default class AddStockUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	// onOrder = (navigation: any, orderId: number, retailerId: number, otherDetails: string) => {
	// 	navigation.navigate("Customers", { id: orderId, retailerId, otherDetails });
	// };

	render() {
		const { navigation, selected, onItemUnSelected, onAddStock } = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Add Stock"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<AddStockListUI {...this.props} />
				{selected.size > 0 && (
					<SelectedUI
						selected={selected}
						onAddStock={onAddStock}
						onItemUnSelected={onItemUnSelected}
					/>
				)}
			</View>
		);
	}
}

AddStockUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// position: "absolute",
		// width: ScalePerctFullWidth(100),
		// height: ScalePerctFullHeight(100),
	},
});
