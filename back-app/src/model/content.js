const ModelBase = require('../database/database')

class Content extends ModelBase {
  static get tableName() {
    return 'contents';
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' }
      }
    }
  }
}

module.exports = Content