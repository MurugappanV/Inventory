import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Header } from "../header";
import SelectedUI from "./SelectedUI";
import AddStockListUI from "./AddStockListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Colors } from "../../asset";
import AlertForm from "./AlertForm";

type Props = {
	navigation: any,
	orderId: number,
	retailerId: number,
	otherDetails: string,
	selected: any,
	deletedItems: any,
	onItemUnSelected: Function,
	onAddStock: Function,
	alertSettings: any,
	onAlertClose: Function,
	onAlertOpen: Function,
};

export default class AddStockUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	render() {
		const {
			navigation,
			selected,
			onItemUnSelected,
			onAddStock,
			alertSettings,
			onAlertClose,
			onAlertOpen,
		} = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Add Stock"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<TouchableOpacity onPress={() => onAlertOpen(1)} style={styles.btn}>
					<Text style={styles.btnText}>{"+ New Group"}</Text>
				</TouchableOpacity>
				<AddStockListUI {...this.props} />
				{selected.size > 0 && (
					<SelectedUI
						selected={selected}
						onAddStock={onAddStock}
						onItemUnSelected={onItemUnSelected}
					/>
				)}
				{alertSettings && <AlertForm {...alertSettings} onClose={onAlertClose} />}
			</View>
		);
	}
}

AddStockUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#00000010",
		// position: "absolute",
		// width: ScalePerctFullWidth(100),
		// height: ScalePerctFullHeight(100),
	},
	btn: {
		padding: ScalePerctFullWidth(1),
		alignSelf: "stretch",
		backgroundColor: "#00000010",
	},
	btnText: {
		color: Colors.bodySecondaryDark,
		alignSelf: "flex-end",
		fontSize: 11,
	},
});
