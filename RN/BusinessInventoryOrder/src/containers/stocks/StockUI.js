import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import AddStockUI from "./AddStockUI";
import StockListUI from "./StockListUI";

type Props = {
	navigation: any,
	permissions: any,
};

export default class StockUI extends PureComponent<Props> {
	render() {
		const { navigation, permissions } = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Stocks"
					isLogoutEnable
					navigation={navigation}
					onBack={() => navigation.goBack()}
				/>
				<StockListUI {...this.props} />
				{permissions.stock.add && (
					<AddStockUI
						onPress={() => {
							navigation.navigate("AddStock");
						}}
					/>
				)}
			</View>
		);
	}
}

StockUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
