const express = require("express");
const profileStorage = require("../Configuration/UserProfileConfig");

const memberRouter = express.Router();

memberRouter.post(
    "/addMember",
    profileStorage.fields([{ name: "profile", maxCount: 1 }]),
);

module.exports = { memberRouter };
