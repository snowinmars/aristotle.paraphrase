FROM node:lts-alpine AS packagecache
WORKDIR /app

COPY package.json .
RUN yarn install



FROM node:lts-alpine AS build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .
COPY --from=packagecache /app/node_modules /app/node_modules
RUN yarn run build --modern --production

RUN cp scripts/build-env.sh build/build-env.sh
RUN mv dockerentrypoint.sh build/dockerentrypoint.sh
RUN chmod +x build/dockerentrypoint.sh



FROM nginx
WORKDIR /app

ARG REACT_GIT_HASH=
ENV REACT_GIT_HASH=$REACT_GIT_HASH

RUN mkdir -p /var/log/nginx/logs
COPY --from=build /app/build /usr/share/nginx/html
COPY *.conf /etc/nginx/conf.d/
RUN touch .env.gen && rm -f .env.gen
# will be used in build-env.sh
RUN echo "REACT_GIT_HASH=$REACT_GIT_HASH" >> /usr/share/nginx/html/.env.gen

EXPOSE 3000
CMD [ "/usr/share/nginx/html/dockerentrypoint.sh" ]
