import { AsyncStorage } from "react-native";

export function setUserStorage(userId, token) {
	if (userId == null) {
		AsyncStorage.removeItem("user");
	} else {
		AsyncStorage.setItem("user", `${userId},${token}`);
	}
}

export function getUserStorage() {
	return AsyncStorage.getItem("user");
}
