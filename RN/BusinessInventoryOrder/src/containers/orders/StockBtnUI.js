import React from "react";
import { StyleSheet } from "react-native";
import { ImageBtn } from "../../components";
import { Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
};

export default function renderStockBtn(props: Props) {
	const { onPress } = props;
	return (
		<ImageBtn
			style={styles.addBtn}
			source={Images.inventoryImg}
			onPress={onPress}
			imgStyle={styles.addBtnImg}
		/>
	);
}

const styles = StyleSheet.create({
	addBtn: {
		position: "absolute",
		bottom: 90,
		right: 20,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: Colors.bgPrimaryDark,
		elevation: 5,
	},
	addBtnImg: {
		width: 18,
		height: 18,
		tintColor: Colors.bodySecondaryLight,
	},
});
