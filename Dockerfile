FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

RUN npm install -g @prisma/client

USER node 


WORKDIR /home/node/app