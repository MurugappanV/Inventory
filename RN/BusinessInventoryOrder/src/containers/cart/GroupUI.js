import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import SubGroupListUI from "./SubGroupListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
	onQtyChanged: Function,
	data: any,
};

export default class GroupUI extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { isCollapsed: false };
	}

	onHeaderPress = () => {
		const { isCollapsed } = this.state;
		this.setState({ isCollapsed: !isCollapsed });
	};

	render() {
		const { data, onQtyChanged, selected } = this.props;
		const { isCollapsed } = this.state;
		const { name } = data;
		return (
			<View style={styles.cont}>
				<TouchableOpacity onPress={this.onHeaderPress} style={styles.headerContainer}>
					<Text style={styles.headerText}>{name}</Text>
				</TouchableOpacity>
				{isCollapsed && (
					<View>
						<SubGroupListUI {...data} onQtyChanged={onQtyChanged} selected={selected} />
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cont: {
		paddingTop: ScalePerctFullWidth(4),
		paddingHorizontal: ScalePerctFullWidth(4),
	},
	headerContainer: {
		borderBottomWidth: 1,
		borderColor: Colors.bodySecondaryDark,
		padding: ScalePerctFullWidth(1),
	},
	headerText: {
		color: Colors.bodySecondaryDark,
		alignSelf: "flex-start",
		fontSize: 11,
		fontWeight: "bold",
	},
});
