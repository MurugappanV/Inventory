const SET_USER_ID = "SET_USER_ID";
const CLEAR_USER_ID = "CLEAR_USER_ID";
const SET_ORDERS = "SET_ORDERS";
const CLEAR_ORDERS = "CLEAR_ORDERS";
const SET_STOCKS = "SET_STOCKS";
const CLEAR_STOCKS = "CLEAR_STOCKS";
const SET_ITEMS = "SET_ITEMS";
const CLEAR_ITEMS = "CLEAR_ITEMS";
const SET_SELECTED_ITEMS = "SET_SELECTED_ITEMS";
const SET_DELETED_ITEMS = "SET_DELETED_ITEMS";
const CLEAR_CART_ITEMS = "CLEAR_CART_ITEMS";
const SET_CUSTOMERS = "SET_CUSTOMERS";
const CLEAR_CUSTOMERS = "CLEAR_CUSTOMERS";
const SET_UPDATE_ORDER = "SET_UPDATE_ORDER";
const CLEAR_UPDATE_ORDER = "CLEAR_UPDATE_ORDER";
const SET_UPDATE_STOCK = "SET_UPDATE_STOCK";
const CLEAR_UPDATE_STOCK = "CLEAR_UPDATE_STOCK";
const SET_UPDATE_CUSTOMER = "SET_UPDATE_CUSTOMER";
const CLEAR_UPDATE_CUSTOMER = "CLEAR_UPDATE_CUSTOMER";

const Types = {
	user: {
		SET_USER_ID,
		CLEAR_USER_ID,
	},
	order: {
		SET_ORDERS,
		CLEAR_ORDERS,
	},
	stock: {
		SET_STOCKS,
		CLEAR_STOCKS,
	},
	item: {
		SET_ITEMS,
		CLEAR_ITEMS,
	},
	cart: {
		SET_SELECTED_ITEMS,
		SET_DELETED_ITEMS,
		CLEAR_CART_ITEMS,
	},
	customer: {
		SET_CUSTOMERS,
		CLEAR_CUSTOMERS,
	},
	update: {
		SET_UPDATE_ORDER,
		CLEAR_UPDATE_ORDER,
		SET_UPDATE_STOCK,
		CLEAR_UPDATE_STOCK,
		SET_UPDATE_CUSTOMER,
		CLEAR_UPDATE_CUSTOMER,
	},
};

export default Types;
