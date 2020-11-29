#!/usr/bin/env bash

cd "${0%/*}" # cd to the current dir

. variables.sh

gitHash=$(git rev-parse --short HEAD)
echo $(pwd)
src="$(pwd)/../src"

docker build \
		-t $ariphDb \
		$src/db

docker build \
		-t $ariphBe \
		--build-arg GIT_HASH=$gitHash \
		$src/be

docker build \
		-t $ariphNtf \
		--build-arg GIT_HASH=$gitHash \
		$src/ntf

docker build \
		-t $ariphFe \
		--build-arg REACT_GIT_HASH=$gitHash \
		$src/fe

docker build \
		-t $ariphNgx \
		--build-arg LETSENCRYPT_PASSWORD=$LETSENCRYPT_PASSWORD \
		$src/ngx
