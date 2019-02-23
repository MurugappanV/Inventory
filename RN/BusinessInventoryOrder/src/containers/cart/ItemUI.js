import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
// import SubGroupUI from "./SubGroupUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
	onQtyChanged: Function,
	data: any,
};

export default class ItemUI extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	onChanged(id, text, available, bill_name) {
		const { onQtyChanged } = this.props;
		let newText = "";
		const numbers = "0123456789";

		for (let i = 0; i < text.length; i++) {
			if (numbers.indexOf(text[i]) > -1 && Number.parseInt(newText + text[i]) <= available) {
				newText += text[i];
			} else {
				// your call back function
				alert("please enter numbers less than available");
			}
		}
		if (newText === "") newText = "0";
		onQtyChanged(id, bill_name, Number.parseInt(newText));
		this.setState({ text: newText });
	}

	render() {
		const { data } = this.props;
		const { text } = this.state;
		const { id, name, available, bill_name } = data;
		return (
			<View style={styles.cont}>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>{name}</Text>
					<TextInput
						style={styles.input}
						keyboardType="numeric"
						onChangeText={text => this.onChanged(id, text, available, bill_name)}
						value={text}
					/>
					<Text style={styles.avilText}>{` / ${available}`}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cont: {
		paddingVertical: ScalePerctFullWidth(1),
		paddingLeft: ScalePerctFullWidth(3),
	},
	headerContainer: {
		borderBottomWidth: 0.2,
		borderColor: "#00000020",
		padding: ScalePerctFullWidth(1),
		paddingBottom: ScalePerctFullWidth(3),
		flexDirection: "row",
		alignItems: "center",
	},
	headerText: {
		alignSelf: "center",
		fontSize: 11,
		flex: 1,
	},
	input: {
		height: 30,
		fontSize: 11,
		borderBottomWidth: 1,
		borderColor: Colors.bodyPrimaryVarient,
	},
	avilText: {
		width: ScalePerctFullWidth(10),
		fontSize: 11,
		color: Colors.bodyPrimaryVarient,
	},
});
