#!/usr/bin/env bash

cd "${0%/*}" # cd to the current dir
set -e

. variables.sh

gitHash=$(git rev-parse --short HEAD)
echo $(pwd)
src="$(pwd)/../src"

echo && echo "latex"

docker build \
		-t $ariphTex \
		--file $src/latex/Dockerfile \
		$src/latex

echo && echo "be"

docker build \
		-t $ariphBe \
		--build-arg GIT_HASH=$gitHash \
		--file $src/be/Dockerfile \
		$src # not $src/be, see it's Dockerfile

echo && echo "fe"

docker build \
		-t $ariphFe \
		--build-arg REACT_GIT_HASH=$gitHash \
		--build-arg REACT_APP_HOST=$ariphBePublicUrl \
		--file $src/fe/Dockerfile \
		$src/fe

echo && echo "ngx"

LETSENCRYPT_HREF="https://ya.ru"
# LETSENCRYPT_PASSWORD= # do not set password here, use `LETSENCRYPT_PASSWORD=password ./scripts/build` syntax

docker build \
		-t $ariphNgx \
		--build-arg LETSENCRYPT_HREF=$LETSENCRYPT_HREF \
		--build-arg LETSENCRYPT_PASSWORD=$LETSENCRYPT_PASSWORD \
		--file $src/ngx/Dockerfile \
		$src/ngx
