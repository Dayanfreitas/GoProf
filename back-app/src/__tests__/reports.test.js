const { Reports } = require('../model');

describe('Reports Model', () => {
  it('deve ter no nome da tabela de users', () => {
    expect(Reports.tableName).toBe('reports');
  });
  
  it('deve ter retorna os campos obrigatórios', () => {
    
    expect(Reports.jsonSchema.required).toEqual([]);
  });

  it('deve retorna rodas as propiedades', () => {
    expect(Object.keys(Reports.jsonSchema?.properties)).toEqual(["id"]);
  });
});