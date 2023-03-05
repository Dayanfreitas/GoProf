const { User } = require("../model");

module.exports = async (req, res, next) => {
    const { id } = req.params
    const currentUser = await User.query().findOne({ id: req.userID })
    const have_user = await User.query().where({ id }).first()

    const notAdmin = !currentUser.permission
    const youself = (id == currentUser.id)
    
    if (!have_user) {
        return res.status(404).json({ type: 'error', err: 'Not found', user: {} })
    }

    if (notAdmin && !youself) {
        return res.status(403).json({type: 'error', err: 'Forbbiden', user: {} })
    }

    next();
}