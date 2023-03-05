const ResposityUsers = require('../../repository/users')

module.exports = {
    async getAll() {
        const users = await ResposityUsers.getAll();
        return users
    },

    async destroy(params) {
        const athlete = ResposityUsers.destroy(params)
        return athlete
    }
    
}