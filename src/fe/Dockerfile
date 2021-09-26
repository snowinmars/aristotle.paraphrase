FROM node:lts-alpine AS packagecache
WORKDIR /app

COPY package.json .
RUN yarn install



FROM node:lts-alpine AS build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY --from=packagecache /app/node_modules /app/node_modules
COPY . .
RUN yarn build



FROM nginx
WORKDIR /app

ARG REACT_GIT_HASH
ARG REACT_APP_HOST
ARG REACT_APP_PORT
ARG REACT_APP_PROTOCOL

RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/*

RUN mkdir -p /var/log/nginx/logs
COPY --from=build /app/dist /usr/share/nginx/html
COPY *.conf /etc/nginx/conf.d/

EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]
