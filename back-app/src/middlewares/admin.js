const { User } = require("../model");

module.exports = async (req, res, next) => {
    const currentUser = await User.query().findOne({ id: req.userID })

    if (!currentUser || !currentUser.permission) {
        return res.status(401).json({error: 'Not Permission !'})
    }

    next();
}