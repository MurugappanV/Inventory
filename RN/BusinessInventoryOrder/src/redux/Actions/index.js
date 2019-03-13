import * as UserActions from "./User";
import * as OrderActions from "./Order";
import * as ItemActions from "./Item";
import * as CartActions from "./Cart";
import * as CustomerActions from "./Customer";
import * as UpdatesAction from "./Updates";
import * as StockActions from "./Stock";
import * as UsersActions from "./Users";

const Actions = Object.assign(
	{},
	UserActions,
	OrderActions,
	StockActions,
	ItemActions,
	CartActions,
	CustomerActions,
	UpdatesAction,
	UsersActions,
);

export default Actions;
