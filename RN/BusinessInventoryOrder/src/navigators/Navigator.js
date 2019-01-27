/**
 * First Navigator , swicthes between login and home
 * Author : Murugappan V
 * Date   : 8 Jan 2018
 * @flow
 */

import React, { PureComponent } from "react";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { Login, AuthLoading, Orders, Cart } from "../containers";

const Stack = createStackNavigator(
	{
		Orders: { screen: Orders },
		Cart: { screen: Cart },
	},
	{
		defaultNavigationOptions: () => ({
			header: null,
		}),
	},
);

const NavContainer = createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading,
			Home: Stack,
			Login,
		},
		{
			initialRouteName: "AuthLoading",
		},
	),
);

export default class Navigator extends PureComponent {
	render() {
		return <NavContainer />;
	}
}
