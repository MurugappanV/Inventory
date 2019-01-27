import React from "react";
import { StyleSheet } from "react-native";
import { ImageBtn } from "../../components";
import { Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
};

export default function renderAddOrder(props: Props) {
	const { onPress } = props;
	return (
		<ImageBtn
			style={styles.addBtn}
			source={Images.addImg}
			onPress={onPress}
			imgStyle={styles.addBtnImg}
		/>
	);
}

const styles = StyleSheet.create({
	addBtn: {
		position: "absolute",
		bottom: 20,
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
