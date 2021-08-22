#!/usr/bin/env bash

set -e

ids=$(docker ps | grep src | awk '{print $1;}')
echo

for id in ${ids}; do
	ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $id)
	name=$(docker inspect -f '{{.Config.Image}}' $id)
	printf "%-8s / %-12s is listening on %-16s \n" $id $name $ip
	docker port $id

	echo
done
