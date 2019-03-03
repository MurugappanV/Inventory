import * as UserActions from "./User";
import * as OrderActions from "./Order";
import * as ItemActions from "./Item";
import * as CartActions from "./Cart";
import * as CustomerActions from "./Customer";
import * as UpdatesAction from "./Updates";

const Actions = Object.assign(
	{},
	UserActions,
	OrderActions,
	ItemActions,
	CartActions,
	CustomerActions,
	UpdatesAction,
);

export default Actions;
