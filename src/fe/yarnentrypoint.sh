set -ue

cd scripts
touch .env.gen && rm -f .env.gen
echo "REACT_APP_HOST=http://localhost:5002" >> .env.gen

chmod +x build-env.sh

./build-env.sh

cd ..
cp scripts/env-config.js.gen public
node scripts/start.js
