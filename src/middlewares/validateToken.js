import jwt from "jsonwebtoken";

export const validateYoken = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid token.");
    }
}