#!/usr/bin/env bash

. variables.sh

docker pull $ariphNgx
docker pull $ariphFe
docker pull $ariphBe
docker pull $ariphNtf
docker pull $ariphDb
