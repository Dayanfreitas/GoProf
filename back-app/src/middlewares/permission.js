const { User } = require("../model");

module.exports = async (req, res, next) => {
    const currentUser = await User.query().findOne({ id: req.userID })
    const notAdmin = !currentUser.permission
    
    if (notAdmin) {
        return res.status(403).json({type: 'error', err: 'Forbbiden', user: {} })
    }

    next();
}