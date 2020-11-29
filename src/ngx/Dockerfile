FROM nginx AS build

WORKDIR /home/ubuntu/

ARG LETSENCRYPT_PASSWORD
ENV BE_HOST=
ENV FE_HOST=

# COPY letsencrypt.tar.gz .
RUN apt-get update
RUN apt-get install -y jq unzip

# the default shell is /bin/sh and it will fail the next curl command
SHELL ["/bin/bash", "-c"]

# I have to download a secret archive,
# but I can't use variables, so it's a one punch script
RUN curl -L $( jq -r '.href' <<< $( curl " todo " ) ) -o newguid.zip
RUN unzip -P $LETSENCRYPT_PASSWORD newguid.zip



FROM nginx

WORKDIR /home/ubuntu/

RUN mkdir -p /var/log/nginx/logs
RUN mkdir -p /var/www/html/.well-known/acme-challenge
RUN mkdir -p /etc/letsencrypt
RUN rm /etc/nginx/conf.d/*

COPY dockerentrypoint.sh .
RUN chmod +x dockerentrypoint.sh
COPY *.conf.template /etc/nginx/conf.d/
COPY --from=build /home/ubuntu/etc/letsencrypt /etc/letsencrypt

CMD [ "./dockerentrypoint.sh" ]

EXPOSE 80
EXPOSE 443
