envsubst '${BE_HOST} ${FE_HOST}' < /etc/nginx/conf.d/proxy.conf.template > /etc/nginx/conf.d/proxy.conf
nginx -g 'daemon off;'
