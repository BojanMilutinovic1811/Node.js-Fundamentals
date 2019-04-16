var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * DemoUser Model
 * ==========
 */
var DemoUser = new keystone.List('DemoUser');

DemoUser.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
DemoUser.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
DemoUser.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
DemoUser.defaultColumns = 'name, email, isAdmin';
DemoUser.register();
