const { Content } = require('../model');

describe('Content Model', () => {
  it('deve ter no nome da tabela de users', () => {
    expect(Content.tableName).toBe('contents');
  });
  
  it('deve ter retorna os campos obrigatórios', () => {
    
    expect(Content.jsonSchema.required).toEqual([]);
  });

  it('deve retorna rodas as propiedades', () => {
    expect(Object.keys(Content.jsonSchema.properties)).toEqual(["id"]);
  });
});