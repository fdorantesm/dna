FROM node:16 as build
LABEL stage=build
WORKDIR /src/build

COPY package.json .
COPY yarn.lock .

RUN yarn config set network-timeout 60000
RUN yarn install

COPY . .

RUN yarn build
RUN yarn install --production=true

FROM node:16-alpine as deploy
WORKDIR /app

COPY --from=build /src/build/dist/main.js index.js
COPY --from=build /src/build/node_modules node_modules

ENTRYPOINT node .
