import realm from "./realm";

export function addUserCredentialsRealm(token, userId) {
	realm.write(() => {
		realm.create("UserCredentials", {
			token,
			userId,
		});
	});
}

export function getUserCredentialsRealm() {
	const creds = realm.objects("UserCredentials");
	const cred = creds.slice(0, 1);
	console.log("uc realm", cred);
	// realm.write(() => {
	// 	realm.delete(cred);
	// });
	return cred.length > 0 ? cred[0] : null;
}

export function removeUserCredentialsRealm() {
	const creds = realm.objects("UserCredentials");
	realm.write(() => {
		realm.delete(creds);
	});
}
