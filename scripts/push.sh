#!/usr/bin/env bash

. variables.sh
set -e

echo "Push last builded local images..."

# docker push $ariphNgx
docker push $ariphFe
docker push $ariphBe
