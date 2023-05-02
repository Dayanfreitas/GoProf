module.exports = async (req, res, next) => {
    const { id } = req.params

    if (id != req.userID) {
        return res.status(403).json({type: 'error', err: 'Forbbiden' })
    }

    next();
}