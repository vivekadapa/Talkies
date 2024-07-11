const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({
            email: email,
            password: hashedPass
        })
        try {
            await user.save()
            res.status(200).send({
                message: "User Created Successfully",
                user
            });
        } catch (error) {
            res.status(500).send({
                message: "Email already Exists"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Password Not Hashed Properly"
        })
    }

}



exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return (
            res.status(404).send({
                message: "email Not found",
            })
        )
    }
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
        return (
            res.status(400).send({
                message: "Incorrect Password",
            })
        )
    }
    const token = jwt.sign({
        userId: user._id,
        userEmail: user.email
    },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
    )

    res.status(200).send({
        message: "login Successfull",
        email: user.email,
        token
    })
}