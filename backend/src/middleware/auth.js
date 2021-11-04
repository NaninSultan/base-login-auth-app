const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            res.status(400).json({ message: "Authentication failed" })
            throw new Error("AUthentication failed", 400);
        }

        const decodedToken = jwt.verify(token, "paragon");
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(400).json({ message: "Authentication failed" })
        const err = new Error("Authentication failed", 400)
        return next(error);
    }
}