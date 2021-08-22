#!/usr/bin/env bash

set -e

echo "Push last builded local images..."

docker push snowinmars/prf-fe
docker push snowinmars/prf-be
docker push snowinmars/prf-ngx
