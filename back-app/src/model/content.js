const ModelBase = require('../database/database')

class Content extends ModelBase {
  static get tableName() {
    return 'contents';
  }
  
  // static get jsonSchema() {
   
  // }
}

module.exports = Content