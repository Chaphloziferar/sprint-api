import jwt from "jsonwebtoken";
import User from "../models/User";
import { signUpValidation, signInValidation } from "../helpers/authValidation";

const createToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const signUp = async (req, res) => {
    // Validate the data
    const {error} = signUpValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exist');

    // Hash password
    const hashedPassword = await User.encryptPassword(req.body.password);

    // Create a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });

    try {
        await user.save();
        return res.status(201).json({token: createToken(user)});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const signIn = async (req, res) => {
    // Validate the data
    const {error} = signInValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user is already in the database
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send('Username or password is wrong');

    // Password is correct
    const validPass = await User.comparePassword(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Username or password is wrong');

    return res.status(200).json({role: user.role, token: createToken(user)});
}

const renewUserToken = async (req, res) => {
    return res.status(200).json({user: req.user.username, token: createToken(req.user)});
}

exports.signUp = signUp;
exports.signIn = signIn;
exports.renewUserToken = renewUserToken;