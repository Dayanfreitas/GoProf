const { User } = require('../../model')
module.exports = {
    async getByIdAthlete(id) {
        const data = await User.query().where({athlete_id: id}).first();
        return data
    },
    
    async destroyByIdAthlete(id) {
        const data = await User.query().delete().where({athlete_id: id});
        return data
    },
    
    async getById(id) {
        const data = await User.query().findById({id})
        return data
    },

    async getAll() {
        const users = await User.query()
        return users
    },

    async destroy(params) {
        const userDeleted = await User.query().deleteById(params.id);
        return userDeleted
    }
}