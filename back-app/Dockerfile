FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
      
COPY . .

# EXPOSE 8000
EXPOSE 8080

# CMD "yarn"
# CMD "npx knex migrate:latest"
# CMD ["yarn", "start"]