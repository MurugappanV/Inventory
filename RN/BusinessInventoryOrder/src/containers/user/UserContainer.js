import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserUI from "./UserUI";
import { Actions } from "../../redux";
// import { AlertComp } from "../../components";
import { UsersApi, UserTypeUpdateApi } from "../../service";
import { AlertComp } from "../../components";
import UpdateUserTypeApi from "../../service/User/UserTypeUpdate";

type Props = {
	navigation: any,
	clearUsersAction: Function,
	setUsersAction: Function,
	clearUsersUpdateAction: Function,
	users: any,
	usersUpdate: boolean,
};

class UserContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
			noRecordText: "No users found",
		};
	}

	componentDidMount() {
		this.fetchUsers();
	}

	componentDidUpdate(prevProps) {
		const { usersUpdate, clearUsersUpdateAction } = this.props;
		if (usersUpdate && !prevProps.usersUpdate) {
			clearUsersUpdateAction();
			this.fetchUsers();
		}
	}

	fetchUsers = () => {
		this.setState({ loading: true });
		const { clearUsersAction } = this.props;
		clearUsersAction();
		UsersApi(this.onUsersSuccess, this.onUsersFailure, this.onUsersError);
	};

	onUsersSuccess = (items: any) => {
		this.setState({ loading: false, noRecordText: "No users found" });
		const { setUsersAction } = this.props;
		setUsersAction(items);
		// const { setItemsAction } = this.props;
		// setItemsAction(items);
	};

	onUsersFailure = (message: string) => {
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch items failed", message, () => {});
	};

	onUsersError = (error: any) => {
		const message = error.toString();
		this.setState({ loading: false, noRecordText: message });
		// AlertComp("Fetch item error", message, () => {});
	};

	onUserTypeChange = (userId: number, userType: number, name: string, userTypeString: string) => {
		AlertComp(
			"Update user type",
			`Sure want to update ${name} with user type ${userTypeString}`,
			() => this.onConfirm(userId, userType),
			true,
		);
		// const { selected } = this.state;
		// const newSelected = new Map([...selected]); //
		// if (qty === 0) {
		// 	if (newSelected.has(id)) {
		// 		newSelected.delete(id);
		// 	}
		// } else {
		// 	newSelected.set(id, { qty, billName });
		// }
		// console.log("selected", newSelected);
		// this.setState({ selected: newSelected });
	};

	onConfirm = (userId: number, userType: number) => {
		UpdateUserTypeApi(
			userId,
			userType,
			() => this.onUserUpdateSuccess(userId, userType),
			this.onUserUpdateFailure,
			this.onUserUpdateError,
		);
	};

	onUserUpdateSuccess = (userId: number, userType: number) => {
		AlertComp("Update user success", "", () => {});
		const { users } = this.props;
		const newUsers = users.map((user: any) => {
			if (user.id !== userId) {
				return {
					...user,
				}
			}
			return {
				...user,
				user_type: userType,
			}
		})
		const { setUsersAction } = this.props;
		setUsersAction(newUsers);
		// update list with this data
	};

	onUserUpdateFailure = (message: string) => {
		AlertComp("Update user failed", message, () => {});
	};

	onUserUpdateError = (error: any) => {
		const message = error.toString();
		AlertComp("Update user error", message, () => {});
	};

	onAddUser = () => {
		const { navigation } = this.props;
		navigation.navigate("AddUser");
	};

	render() {
		const { loading, noRecordText } = this.state;
		const { users } = this.props;
		return (
			<UserUI
				onAddUser={this.onAddUser}
				{...this.props}
				loading={loading}
				noRecordText={noRecordText}
				users={users}
				onUserTypeChange={this.onUserTypeChange}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.users,
		usersUpdate: state.updates.usersUpdate,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(UserContainer);
