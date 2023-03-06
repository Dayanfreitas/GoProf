const Password = require('objection-password')({
    passwordField: 'passwordHash'
});
const { Model } = require('objection');
const jwt = require('jsonwebtoken');

class User extends Password(Model) {
    static get tableName() {
        return 'users';
    }
    
    generateToken () {
        return jwt.sign({ id: this.id }, process.env.APP_SECRET, {
            expiresIn: process.env.EXPIRATION_TIME*1,
        });
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'passwordHash', 'phone', 'genero'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                passwordHash: { type: 'string', minLength: 8, maxLength: 255 },
                phone: { type: 'string', minLength: 11, maxLength: 255 },
                genero: { type: 'string', minLength: 1, maxLength: 1 },
            }
        }
    }
}

module.exports = User