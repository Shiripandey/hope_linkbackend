const express = require("express");
const router = express.Router();
const Organization = require("../models/organization");

router.post("/register", async (req, res) => {
	const {
		name,
		description,
		pincode,
		unique_id,
		type,
		website,
		phone,
        email,
		address,
	} = req.body;

    if (!name || !description || !pincode || !unique_id || !type || !website || !phone || !email || !address) {
        return res.status(400).json({
            "message": "invalid body data!"
        });
    }

	const org = await Organization.findOne({unique_id});
	if (org) {
		return res.status(409).json({
			"message": "organization with id already exists!"
		});
	}

	await Organization.create({
		name,
		description,
		pincode,
		unique_id,
		type,
		website,
		phone,
        email,
		address
	});

	res.status(200).json({
		message: "organization registration request sent for verification!",
	});
});

router.get("/get/all", async (_, res) => {
	const orgs = await Organization.find({});
	res.status(200).json(orgs);
});

router.get("/get/unverified", async (_, res) => {
	const orgs = await Organization.find({ isVerified: false });
	res.status(200).json(orgs);
});

router.get("/get/:id", async (req, res) => {
	const orgs = await Organization.find({
		unique_id: req.params.id,
	});
	res.status(200).json(orgs);
});

module.exports = router;
