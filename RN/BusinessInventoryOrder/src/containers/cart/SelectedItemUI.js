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

export default class SelectedItemUI extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { text: props.data[1].qty + "" };
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.text !== nextProps.data[1].qty) {
			return {
				text: nextProps.data[1].qty + "",
			};
		}
		return null;
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
		onQtyChanged(id, bill_name, Number.parseInt(newText), available);
		// this.setState({ text: newText });
	}

	render() {
		const { data, onPress } = this.props;
		const { text } = this.state;
		const id = data[0];
		const { qty, billName, available } = data[1];
		return (
			<View style={styles.cont}>
				<View style={styles.headerContainer}>
					<Text style={styles.headerText}>{billName}</Text>
					<TextInput
						style={styles.input}
						keyboardType="numeric"
						onChangeText={text => this.onChanged(id, text, available, billName)}
						value={text}
					/>
					<Text style={styles.avilText}>{` / ${available}`}</Text>
					<TouchableOpacity style={styles.cancelBtn} onPress={() => onPress(id)}>
						<Image source={Images.closeImg} style={styles.img} />
					</TouchableOpacity>
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
		color: Colors.bodySemiTransparent,
	},
	input: {
		height: 35,
		fontSize: 11,
		borderBottomWidth: 1,
		borderColor: Colors.bodyPrimaryVarient,
		padding: 0,
		color: Colors.bodySemiTransparent,
	},
	avilText: {
		fontSize: 11,
		color: Colors.bodyPrimaryVarient,
	},
	cancelBtn: {
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	img: {
		width: 15,
		height: 15,
		tintColor: Colors.bodySemiTransparent,
	},
});

{
	/* <Text style={styles.headerText}>{"X"}</Text> */
}
