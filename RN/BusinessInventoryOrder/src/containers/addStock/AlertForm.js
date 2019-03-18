import React, { PureComponent } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { TextField } from "react-native-material-textfield";
import { ScalePerctFullHeight, ScalePerctFullWidth, Colors } from "../../asset";
import { Button } from "../../components";

type Props = {
	placeholder1: string,
	placeholder2?: string,
	onConfirm: Function,
	title: string,
	onClose: Function,
};

export default class AlertForm extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			input1: "",
			input2: "",
		};
	}

	componentDidMount() {
		this.state = {
			input1: "",
			input2: "",
		};
	}

	onInput1Change = text => {
		this.setState({ input1: text });
	};

	onInput2Change = text => {
		this.setState({ input2: text });
	};

	render() {
		const { placeholder1, placeholder2, onConfirm, title, onClose } = this.props;
		const { input1, input2 } = this.state;
		return (
			<TouchableOpacity onPress={() => onClose(null)} style={styles.confirmAbsoluteContainer}>
				<TouchableOpacity onPress={() => {}} style={styles.confirmContainer}>
					<Text style={styles.titleText}>{title}</Text>
					<TextField
						onSubmitEditing={
							placeholder2
								? () => this.textInput.focus()
								: () => onConfirm(input1, input2)
						}
						returnKeyType={placeholder2 ? "next" : "done"}
						label={placeholder1}
						value={input1}
						onChangeText={this.onInput1Change}
						textColor={Colors.bodyPrimaryLight}
						baseColor={Colors.bodyPrimaryLight}
						tintColor={Colors.bodySecondaryDark}
					/>
					{placeholder2 && (
						<TextField
							ref={(component: any) => {
								this.textInput = component;
							}}
							returnKeyType="done"
							onSubmitEditing={() => onConfirm(input1, input2)}
							label={placeholder2}
							value={input2}
							onChangeText={this.onInput2Change}
							textColor={Colors.bodyPrimaryLight}
							baseColor={Colors.bodyPrimaryLight}
							tintColor={Colors.bodySecondaryDark}
						/>
					)}
					<Button
						style={styles.orderBtn}
						title="Confirm"
						onPress={() => onConfirm(input1, input2)}
					/>
				</TouchableOpacity>
			</TouchableOpacity>
		);
	}
}

AlertForm.defaultProps = {
	placeholder2: undefined,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// position: "absolute",
		// width: ScalePerctFullWidth(100),
		// height: ScalePerctFullHeight(100),
	},
	orderBtn: {
		marginTop: 20,
		alignSelf: "stretch",
		width: "100%",
	},
	confirmAbsoluteContainer: {
		...StyleSheet.absoluteFill,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000000A0",
		zIndex: 10,
	},
	confirmContainer: {
		width: "80%",
		backgroundColor: "#000000BB",
		padding: 20,
		borderRadius: 20,
		borderColor: Colors.bgPrimaryDark,
		borderWidth: 1,
	},
	titleText: {
		fontSize: 14,
		paddingVertical: 5,
		paddingHorizontal: 5,
		color: Colors.bgPrimaryDark,
	},
	otherDetailsInput: {
		fontSize: 11,
		padding: 10,
		marginBottom: 20,
		borderColor: Colors.bgPrimaryDark,
		borderWidth: 1,
		height: 100,
		alignSelf: "stretch",
		textAlignVertical: "top",
	},
});
