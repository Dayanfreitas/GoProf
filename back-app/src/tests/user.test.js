const { User } = require('../model');

describe('User Model', () => {
  it('deve ter no nome da tabela de users', () => {
    expect(User.tableName).toBe('users');
  });
  
  it('deve ter retorna os campos obrigatórios', () => {
    
    expect(User.jsonSchema.required).toEqual(['name', 'last_name', 'email']);
  });

  it('deve retorna rodas as propiedades', () => {
    expect(Object.keys(User.jsonSchema.properties)).toEqual(["id", "name", "last_name", "email", "token_sub_google", "image_path"]);
  });
});