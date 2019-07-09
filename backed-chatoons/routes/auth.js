const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

// require the user model !!!!
const User = require("../models/user");

authRoutes.post("/signup", (req, res, next) => {
    console.log(req.body);
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const profile_picture = req.body.profile_picture;

    if (!email || !password) {
        res.status(400).json({ message: "Provide email and password" });
        return;
    }
    console.log("password", password);
    if (password.length < 7) {
        res.status(400).json({
            message:
                "Please make your password at least 8 characters long for security purposes."
        });
        return;
    }

    User.findOne({ email }, (err, foundUser) => {
        if (err) {
            res.status(500).json({ message: "Email not found." });
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: "Email taken. Choose another one." });
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const aNewUser = new User({
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPass,
            profile_picture: profile_picture
        });

        aNewUser.save(err => {
            if (err) {
                res
                    .status(400)
                    .json({ message: "Something went wrong User not created." });
                return;
            }
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, err => {
                if (err) {
                    res.status(500).json({ message: "Login after signup went bad." });
                    return;
                }

                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});

authRoutes.post("/login", (req, res, next) => {
    console.log(req.body);

    //   passport.use(
    //     new LocalStrategy({
    //       usernameField: "email",
    //       passwordField: "password"
    //     })
    //   );

    passport.authenticate("local", (err, theUser, failureDetails) => {
        if (err) {
            res
                .status(500)
                .json({ message: "Something went wrong with authenticating user" });
            return;
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            console.log(failureDetails);
            res.status(401).json(failureDetails);
            return;
        }

        passport.serializeUser(function (user, done) {
            done(null, theUser._id);
            // if you use Model.id as your idAttribute maybe you'd want
            // done(null, user.id);
        });

        // save user in session
        req.login(theUser, err => {
            if (err) {
                res.status(500).json({ message: "Session not save." });
                console.log(err);
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
        //console.log(res);
    })(req, res, next);
});

authRoutes.post("/logout", (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: "Log out successfully!" });
});

authRoutes.get("/loggedin", (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: "Unauthorized" });
});

module.exports = authRoutes;