#!/usr/bin/env bash

. variables.sh

echo "Push last local images..."

docker push $ariphNgx
docker push $ariphFe
docker push $ariphBe
docker push $ariphNtf
docker push $ariphDb
