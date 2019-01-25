import { Alert } from "react-native";

function AlertComp(title: string, msg: string, onOk: Function) {
	Alert.alert(title, msg, [{ text: "OK", onPress: onOk }], { cancelable: true });
}

export default AlertComp;
