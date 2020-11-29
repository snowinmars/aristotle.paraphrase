set -ue

cd /usr/share/nginx/html
chmod +x build-env.sh

./build-env.sh

nginx -g 'daemon off;'
