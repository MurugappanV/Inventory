/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { Navigator, Store } from "./src";

export default class App extends PureComponent {
	componentDidMount() {
		SplashScreen.hide();
	}

	render() {
		return (
			<Provider store={Store}>
				<Navigator />
			</Provider>
		);
	}
}
