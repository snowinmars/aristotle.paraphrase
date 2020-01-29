FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY . /app

RUN yarn install --silent
RUN sed -i "s/'ws'/window.location.protocol === 'https' ? 'wss' : 'ws'/" /app/node_modules/react-dev-utils/webpackHotDevClient.js
RUN yarn run build


CMD ["serve", "-s", "/app/build"]
