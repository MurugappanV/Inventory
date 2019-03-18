import React, { PureComponent } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Header } from "../header";
import AddStockUI from "./AddStockUI";
import StockListUI from "./StockListUI";
import { ScalePerctFullWidth, ScalePerctFullHeight, Images } from "../../asset";

type Props = {
	navigation: any,
	permissions: any,
};

export default class StockUI extends PureComponent<Props> {
	onStockList = () => {
		const { navigation } = this.props;
		navigation.navigate("StockList");
	};

	render() {
		const { navigation, permissions } = this.props;
		return (
			<View style={styles.container}>
				<Image source={Images.bgImg} style={styles.fullContainer} resizeMode={"cover"} />
				<Header
					title="Stocks"
					isLogoutEnable
					navigation={navigation}
					onBack={() => navigation.goBack()}
					onStockList={this.onStockList}
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
	fullContainer: {
		position: "absolute",
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
		zIndex: -1,
	},
});
