class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(32), nullable=False)
    user_type = db.Column(db.Integer, nullable=False)
    user_logs = db.relationship('OrderLog', backref='user', lazy=True)

class Retailer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phone_no = db.Column(db.String(64), nullable=False)
    orders = db.relationship('Order', backref='retailer', lazy=True)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Integer, nullable=False)
    other_details = db.Column(db.String(255), nullable=False)
    retailer_id = db.Column(db.Integer, db.ForeignKey('retailer.id'), nullable=False)
    order_items = db.relationship('OrderItem', backref='order', lazy=True)
    order_logs = db.relationship('OrderLog', backref='order', lazy=True)

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    qty = db.Column(db.Integer, nullable=False)
    is_deleted = db.Column(db.Boolean, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)

class OrderLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    action = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    sub_groups = db.relationship('SubGroup', backref='group', lazy=True)

class SubGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)
    items = db.relationship('Item', backref='subGroup', lazy=True)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    available = db.Column(db.Integer, nullable=False)
    ordered = db.Column(db.Integer, nullable=False)
    sold = db.Column(db.Integer, nullable=False)
    misc = db.Column(db.Integer, nullable=False)
    sub_group_id = db.Column(db.Integer, db.ForeignKey('subGroup.id'), nullable=False)
    item_orders = db.relationship('OrderItem', backref='item', lazy=True)


INSERT INTO `group` (`id`, `name`, `order`) VALUES
(1, 'GLUE STICK', 1),
(2, 'SCHOOL STATIONARY', 2),
(3, 'WRITING MARKER PEN', 3),
(4, 'CORRECTION MATERIAL', 4);

INSERT INTO `sub_group` (`id`, `name`, `group_id`) VALUES
(1, 'GLUE STICK', 1),
(2, 'BLISTER PACK GLUE STICK', 1),
(3, 'DUSTER', 2),
(4, 'COLOR PALLETS', 2),
(5, 'BLISTER PACK', 2),
(6, 'OHP MARKER PEN', 3),
(7, 'PERMANENT MARKER PEN', 3),
(8, 'WHITE BOARD MARKER PEN', 3),
(9, 'HIGHLIGHTER PEN', 3),
(10, 'CORRECTION PEN', 4);

INSERT INTO `item` (`id`, `name`, `sub_group_id`, `available`, `ordered`, `sold`, `misc`) VALUES
(1, '5 GM', 1, 1000, 0, 0, 0),
(2, '8 GM', 1, 1000, 0, 0, 0),
(3, '15 GM', 1, 1000, 0, 0, 0),
(4, '25 GM', 1, 1000, 0, 0, 0),
(5, '35 GM', 1, 1000, 0, 0, 0),
(6, '25 GM', 2, 1000, 0, 0, 0),
(7, '35 GM', 2, 1000, 0, 0, 0),
(8, 'SMALL', 3, 1000, 0, 0, 0),
(9, 'BIG', 3, 1000, 0, 0, 0),
(10, 'MAGNETS', 3, 1000, 0, 0, 0),
(11, 'SMALL WITH WBM PEN', 3, 1000, 0, 0, 0),
(12, ' ', 4, 1000, 0, 0, 0),
(13, '(1 DUSTER + 4 WBM + 1 WCS KIT)', 5, 1000, 0, 0, 0),
(14, 'BLUE', 6, 1000, 0, 0, 0),
(15, 'BLACK', 6, 1000, 0, 0, 0),
(16, 'RED', 6, 1000, 0, 0, 0),
(17, 'GREEN', 6, 1000, 0, 0, 0),
(18, 'BLUE', 7, 1000, 0, 0, 0),
(19, 'BLACK', 7, 1000, 0, 0, 0),
(20, 'RED', 7, 1000, 0, 0, 0),
(21, 'Special colors', 8, 1000, 0, 0, 0),
(22, '(SET OF 8)', 8, 1000, 0, 0, 0),
(23, 'FLU', 9, 1000, 0, 0, 0),
(24, 'YELLOW', 9, 1000, 0, 0, 0),
(25, '(SET OF 6)', 9, 1000, 0, 0, 0),
(26, '7 ML RED PKG.', 10, 1000, 0, 0, 0),
(27, '7 ML BLUE PKG. ROLLER TIP', 10, 1000, 0, 0, 0);

INSERT INTO `order` (`id`, `status`, `other_details`, `retailer_id`) VALUES
(1, 2, 'Please send soon', 1),
(2, 1, 'Please pack well', 2);

{
    1: CREATED,
    2: EDITED,
}

INSERT INTO `retailer` (`id`, `name`, `address`, `phone_no`) VALUES
(1, 'Murugappan', '29, Perumal kovil street,;saravanampatti,;coimbatore,;pincode - 641035', '8489907032'),
(2, 'Viswanthan', '29, Perumal kovil street,;saravanampatti,;coimbatore,;pincode - 641035', '9443366955');

INSERT INTO `user` (`id`, `name`, `password`, `email`, `user_type`) VALUES
(1, 'admin', 'abcd123', 'murugappanviswanathan@gmail.com', 1),
(2, 'seller', 'officematemv', 'new@gmail.com', 3);

INSERT INTO `order_log` (`id`, `order_id`, `user_id`, `date`, `action`) VALUES
(1, 1, 2, '2019-01-21 18:30:00', 1),
(2, 2, 2, '2019-01-22 18:30:00', 1),
(3, 1, 1, '2019-01-22 18:30:00', 2);

{
    1: CREATE_ORDER,
    2: EDIT_ORDER,
}

INSERT INTO `order_item` (`id`, `order_id`, `item_id`, `qty`, `is_deleted`) VALUES
(1, 1, 1, 10, 0),
(2, 1, 2, 5, 0),
(3, 1, 9, 15, 0),
(4, 1, 10, 15, 1),
(5, 2, 3, 17, 0),
(6, 2, 4, 16, 0),
(7, 2, 6, 16, 0),
(8, 2, 7, 61, 0),
(9, 2, 18, 34, 0),
(10, 2, 26, 54, 0);