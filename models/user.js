const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
    token: {
        type: String,
        default: ""
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
