FROM node:20.13.1-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn prisma generate

RUN yarn build

CMD [ "yarn", "start:dev" ]