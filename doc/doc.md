# Docker
Para subir o docker:

1. Criar arquivo `env` com base no `.env.exemplo.docker-compose`
```bash
cp .env.exemplo.docker-compose .env
```

```bash
docker-compose up
```

# front-app

1. Dentro do projeto `front-app` o arquivo config.js deve mudar as variaveis:
   
```js
// host de comunicão da api
SERVER_HOST
// porta de comunicão da api
SERVER_PORT
```    

# back-app

Criar o `.env` e mundar os dados necessários

```bash
cp .env.exemplo .env
```
