const { User } = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingName;
    try {
        existingName = await User.findOne({ name: name })
    } catch (error) {
        res.status(500).json({ message: "Could not connect to database" })
        const err = new Error("Could not connect to database", 500)
        return next(err)
    }

    if (existingName) {
        res.status(400).json({ message: "Username already in use, please choose another one." })
        const err = new Error("Username already in use, please choose another one.", 400)
        return next(err) 
    }

    let existingEmail;
    try {
        existingEmail = await User.findOne({ email: email })
    } catch (error) {
        res.status(500).json({ message: "Could not connect to database" })
        const err = new Error("Could not connect to database", 500)
        return next(err)
    }

    if (existingEmail) {
        res.status(400).json({ message: "Email already in use." })
        const err = new Error("Email already in use.", 400)
        return next(err) 
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        res.status(500).json({ message: "Could not hash password, please try again." })
        const err = new Error("Could not hash password, please try again.", 500)
        return next(err)
    }

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword
    });

    try {
        await newUser.save();
    } catch (error) {
        res.status(500).json({ message: "Could not create user, please try again." })
        const err = new Error("Could not create user, please try again", 500);
        return next(err)
    }

    res.status(201).json({ user: newUser });
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        res.status(500).json({ message: "Could not connect to database" })
        const err = new Error("Could not connect to database", 500)
        return next(err)
    }

    if (!existingUser) {
        res.status(400).json({ message: "User with that email does not exists." })
        const err = new Error("User with that email does not exists.", 400)
        return next(err)
    }

    let validPassword;

    try {
        validPassword = await bcrypt.compare(password, existingUser.password)
    } catch (error) {
        res.status(500).json({ message: "Email and password do not match. Please try again." })
        const err = new Error("Email and password do not match. Please try again.", 500)
        return next(err)
    }

    if (!validPassword) {
        res.status(403).json({ message: "Incorrect password. Please try again." })
        const err = new Error("Incorrect password. Please try again.", 403)
        return next(err)
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: existingUser.id
            },
            "paragon",
            { expiresIn: "1200000ms", }
        );
    } catch (error) {
        const err = new Error("Logging in failed, please try again later.", 500);
        return next(err)
    }
    res.status(200).json({ token: token })

}

exports.getProfileInformation = async (req, res, next) => {
    const id = req.userData.userId;
    let user;
    try {
        user = await User.findById(id)
    } catch (err) {
        res.status(500).json({ message: "Couldnt connect to database" })
        const error = new Error("Couldnt connect to database");
        return next(error)
    }
    res.status(200).json({ name: user.name, email: user.email })
}