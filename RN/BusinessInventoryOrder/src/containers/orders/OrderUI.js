import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { ImageBtn } from "../../components";
import { Header } from "../header";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {};

export default class OrderUI extends PureComponent<Props> {
	render() {
		const {} = this.props;
		return (
			<View style={styles.container}>
				<Header title="Orders" />
				<View style={styles.inputContainer} />
				<ImageBtn
					style={styles.addBtn}
					source={Images.logoutImg}
					onPress={() => {}}
					imgStyle={styles.addBtnImg}
				/>
			</View>
		);
	}
}

OrderUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	addBtn: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.bgPrimaryDark,
	},
	addBtnImg: {
		width: 20,
		height: 20,
		tintColor: Colors.bgPrimaryLight,
	},
	inputContainer: {
		paddingHorizontal: ScalePerctFullWidth(10),
		paddingVertical: ScalePerctFullHeight(10),
	},
});
