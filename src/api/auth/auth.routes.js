const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { generateTokens } = require("../../utils/jwt");
const { addRefreshTokenToWhitelist } = require("./auth.services");
// const jwt = require('jsonwebtoken');

const router = express.Router();
const {
    findUserByEmail,
    createUserByEmailAndPassword,
} = require("../users/users.services");

router.post("/register", async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("You must provide an email and a password.");
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            res.status(400);
            throw new Error("Email already in use.");
        }

        const user = await createUserByEmailAndPassword({ email, password });
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

        res.json({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;