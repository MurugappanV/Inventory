/**
 * First Navigator , swicthes between login and home
 * Author : Murugappan V
 * Date   : 8 Jan 2018
 * @flow
 */

import React, { PureComponent } from "react";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import {
	Login,
	AuthLoading,
	Orders,
	Cart,
	CustomerContainer,
	AddCustomerContainer,
	ViewCart,
	Stocks,
	AddStock,
	ViewStock,
	AddUserContainer,
	UserContainer,
	StockList,
} from "../containers";

const Stack = createStackNavigator(
	{
		Orders: { screen: Orders },
		Cart: { screen: Cart },
		ViewCart: { screen: ViewCart },
		Customers: { screen: CustomerContainer },
		AddCustomer: { screen: AddCustomerContainer },
		Users: { screen: UserContainer },
		AddUser: { screen: AddUserContainer },
		Stocks: { screen: Stocks },
		StockList: { screen: StockList },
		AddStock: { screen: AddStock },
		ViewStock: { screen: ViewStock },
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
