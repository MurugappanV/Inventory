import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "../header";
import SelectedUI from "./ViewSelectedUI";

type Props = {
	navigation: any,
};

export default class ViewStockUI extends PureComponent<Props> {
	onBack = (navigation: any) => {
		navigation.goBack();
	};

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Header
					title="Stock Items"
					navigation={navigation}
					onBack={() => this.onBack(navigation)}
				/>
				<SelectedUI {...this.props} />
			</View>
		);
	}
}

ViewStockUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// position: "absolute",
		// width: ScalePerctFullWidth(100),
		// height: ScalePerctFullHeight(100),
	},
});