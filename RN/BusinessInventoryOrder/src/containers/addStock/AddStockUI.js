import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Header } from "../header";
import SelectedUI from "./SelectedUI";
import AddStockListUI from "./AddStockListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Colors } from "../../asset";

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

	render() {
		const { navigation, selected, onItemUnSelected, onAddStock } = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Add Stock"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<TouchableOpacity onPress={() => {}} style={styles.btn}>
					<Text style={styles.btnText}>{"New Group"}</Text>
				</TouchableOpacity>
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
	btn: {
		padding: ScalePerctFullWidth(1),
	},
	btnText: {
		color: Colors.bodySecondaryDark,
		alignSelf: "flex-start",
		fontSize: 11,
	},
});
