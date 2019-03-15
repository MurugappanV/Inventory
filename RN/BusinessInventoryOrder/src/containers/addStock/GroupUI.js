import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import SubGroupListUI from "./SubGroupListUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
	onQtyChanged: Function,
	onAlertOpen: Function,
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
		const { data, onQtyChanged, selected, onAlertOpen } = this.props;
		const { isCollapsed } = this.state;
		const { id, name } = data;
		return (
			<View style={styles.cont}>
				<TouchableOpacity onPress={this.onHeaderPress} style={styles.headerContainer}>
					<Text style={styles.headerText}>{name}</Text>
					<TouchableOpacity onPress={() => onAlertOpen(2, id)} style={styles.btn}>
						<Text style={styles.btnText}>{"New Sub Group"}</Text>
					</TouchableOpacity>
				</TouchableOpacity>
				{isCollapsed && (
					<View>
						<SubGroupListUI {...data} onQtyChanged={onQtyChanged} selected={selected} onAlertOpen={onAlertOpen}/>
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
		flexDirection: "row",
	},
	headerText: {
		color: Colors.bodySecondaryDark,
		alignSelf: "flex-start",
		fontSize: 11,
		fontWeight: "bold",
		padding: ScalePerctFullWidth(1),
		flex: 1,
	},
	btn: {
		padding: ScalePerctFullWidth(1),
	},
	btnText: {
		color: Colors.bodySecondaryDark,
		alignSelf: "flex-start",
		fontSize: 11,
		fontWeight: "bold",
	},
});
