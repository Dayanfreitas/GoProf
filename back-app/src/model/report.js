const Content = require('./content')
const ModelBase = require('../database/database')

class Reports extends ModelBase {
  static get tableName() {
    return 'reports';
  }
  
  static get relationMappings() {
    return {
      content: {
        relation: ModelBase.BelongsToOneRelation,
        modelClass: Content,
        join: {
          from: 'reports.content_id',
          to: 'contents.id'
        }
      }
    }
  }
  
  // static get jsonSchema() {
   
  // }
}

module.exports = Reports