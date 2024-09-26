const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = decodedToken;
        req.user = user;
        next();

    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            error: new Error("Invalid Request")
        })
    }
}