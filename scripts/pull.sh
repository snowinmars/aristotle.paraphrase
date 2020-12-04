#!/usr/bin/env bash

. variables.sh
set -e

docker pull $ariphNgx
docker pull $ariphFe
docker pull $ariphBe
