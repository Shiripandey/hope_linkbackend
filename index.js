const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

const UserRouter = require("./routes/user");
const OrganizationRouter = require('./routes/organization');
const AdminRouter = require("./routes/admin");

const AdminTokenVerification = require("./middlewares/auth");

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/CharityConnect";

async function main() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("[INFO] Database connected successfully!");
	} catch (err) {
		return console.error(err);
	}

	app.use(cors());
	app.use(express.json());

	app.use("/user", UserRouter);
	app.use("/org", OrganizationRouter);
	app.use("/admin", AdminTokenVerification,AdminRouter);

	app.use((err, _, res, next) => {
		if (res.headersSent) {
			return next(err);
		}

		res.status(500).json({
			error: err,
		});
	});

	app.listen(PORT, () => {
		console.log(`[INFO] Server started on ${PORT}`);
	});
}

main();