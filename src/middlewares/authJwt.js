import jwt from "jsonwebtoken";
import User from "../models/User";

export const validateToken = async (req, res, next) => {
    try {
        const token = req.headers["x-auth-token"];

        if (!token) return res.status(401).send("Access denied. No token provided.");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(400).send('No user found');

        next();
    } catch (error) {
        res.status(401).send("Unauthorized");
    }
}