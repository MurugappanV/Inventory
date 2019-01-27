import * as UserActions from "./User";
import * as OrderActions from "./Order";
import * as ItemActions from "./Item";

const Actions = Object.assign({}, UserActions, OrderActions, ItemActions);

export default Actions;
