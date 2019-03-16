import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import ListItemHeaderUI from "./ListItemHeaderUI";
import ListItemContentUI from "./ListItemContentUI";
import { ScalePerctFullHeight, ScalePerctFullWidth, Images, Colors } from "../../asset";

type Props = {
	data: any,
	permissions: any,
	onOrderPress: Function,
};

export default class ListItem extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { isCollapsed: true };
	}

	onOtherDetailsPress = () => {
		const { isCollapsed } = this.state;
		this.setState({ isCollapsed: !isCollapsed });
	};

	render() {
		const { data, permissions, onOrderPress } = this.props;
		const { isCollapsed } = this.state;
		return (
			<View style={styles.cont}>
				<ListItemHeaderUI
					onOrderPress={(status: number) => {
						onOrderPress(status, data);
					}}
					onOtherDetailsPress={this.onOtherDetailsPress}
					{...data}
					permissions={permissions}
				/>
				<Collapsible collapsed={isCollapsed}>
					<ListItemContentUI {...data} />
				</Collapsible>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cont: {
		paddingTop: ScalePerctFullWidth(4),
		paddingHorizontal: ScalePerctFullWidth(4),
	},
});
