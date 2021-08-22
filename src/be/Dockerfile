FROM node:lts-alpine AS packagecache
WORKDIR /app

COPY package.json .
RUN yarn install



FROM node:lts-alpine AS build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# src/data is ignored in .dockerignore: if you will copy it as is, it will be copied as submodule, but it has to be a repository
RUN apk update
RUN apk add git
RUN git clone https://github.com/snowinmars/aristotle.paraphrase.data src/data

COPY --from=packagecache /app/node_modules /app/node_modules
COPY . .

CMD [ "node", "--loader", "ts-node/esm", "src/app.ts" ]
