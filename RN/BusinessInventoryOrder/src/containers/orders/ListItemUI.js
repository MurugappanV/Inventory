import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import ListItemHeaderUI from "./ListItemHeaderUI";
import ListItemContentUI from "./ListItemContentUI";
import { Images, Colors } from "../../asset";

type Props = {
	onPress: Function,
	data: any,
};

export default class ListItem extends PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { isCollapsed: false };
	}

	onOtherDetailsPress = () => {
		const { isCollapsed } = this.state;
		this.setState({ isCollapsed: !isCollapsed });
	};

	render() {
		const { data } = this.props;
		const { isCollapsed } = this.state;
		return (
			<View style={styles.cont}>
				<ListItemHeaderUI onOtherDetailsPress={this.onOtherDetailsPress} {...data} />
				<Collapsible collapsed={isCollapsed}>
					<ListItemContentUI {...data} />
				</Collapsible>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	cont: {
		paddingTop: 16,
		paddingHorizontal: 16,
	},
});
