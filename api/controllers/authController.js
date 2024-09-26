const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const hashedPass = await bcrypt.hash(password, 10);
//         // const user = new User({
//         //     email: email,
//         //     password: hashedPass
//         // })
//         const user = User.create({
//             email,
//             password: hashedPass
//         })
//         console.log(user)
//         const token = jwt.sign({
//             userId: user._id,
//             userEmail: user.email
//         },
//             "RANDOM-TOKEN",
//             { expiresIn: "24h" }
//         )
//         res.status(200).send({
//             message: "User Created Successfully",
//             user: { ...user, token }
//         });
//     } catch (error) {
//         res.status(500).send({
//             message: "Email already Exists"
//         })
//     }

// } catch (error) {
//     res.status(500).send({
//         message: "Password Not Hashed Properly"
//     })
// }

// }

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUserCheck = await User.findOne({ email })
        if (existingUserCheck) {
            return res.status(403).json({
                message: "User already Exists"
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPass
        })
        console.log(user);
        const token = jwt.sign({
            userId: user._id,
            userEmail: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "15d"
        })
        return res.status(201).json({
            message: "Created a new account",
            token
        })
    } catch (error) {
        console.log(error);
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
        process.env.JWT_SECRET,
        { expiresIn: "15d" }
    )

    res.status(200).send({
        message: "login Successfull",
        user,
        token
    })
}