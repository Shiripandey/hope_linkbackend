const express = require("express");
const router = express.Router();
const Organization = require("../models/organization");

router.post("/org/verify", async (req, res) => {
	const { unique_id } = req.body;
	const org = await Organization.findOne({ unique_id });

	if (!org) {
		return res.status(400).json({
			error: "organization with unique_id not found!",
		});
	}

	org.isVerified = true;
	await org.save();
	res.status(200).json({
		message: "organization verified successfully!",
	});
});

module.exports = router;
