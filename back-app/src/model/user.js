const ModelBase = require('../database/database')

class User extends ModelBase {
    static get tableName() {
        return 'users';
    }
    
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'last_name', 'email'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                last_name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                token_sub_google: { type: 'string', minLength: 1, maxLength: 255 },
                image_path: { type: 'string', minLength: 1, maxLength: 255 }
            }
        }
    }
}

module.exports = User