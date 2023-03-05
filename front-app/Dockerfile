FROM node:19.7.0-alpine
RUN apk update && apk add bash

RUN adduser node root
RUN echo '%root ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER node

WORKDIR /usr/app

COPY package*.json ./
COPY . .

EXPOSE 3000

CMD /bin/bash