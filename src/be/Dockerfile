# build from ..
FROM node AS packagecache
WORKDIR /app

COPY be/package.json .
RUN yarn install

FROM node:lts-alpine AS build
WORKDIR /app

RUN mkdir -p /app/src/latex

# build from .. because of this line
COPY src/latex/ /app/src/latex

ENV PATH /app/node_modules/.bin:$PATH

COPY be/ .
COPY --from=packagecache /app/node_modules /app/node_modules

EXPOSE 5002
CMD ["node", "server.js"]
