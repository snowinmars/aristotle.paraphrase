#!/usr/bin/env bash

. variables.sh

ids=$(docker ps | grep $ariphDockerName | awk '{print $1;}')
total=$(docker ps | grep $ariphDockerName | wc -l)

count=1
echo "Stopping $total containers..."

for id in ${ids}; do
	printf "%-2s / %-2s %-8s is gone" $count $total $(docker stop $id)
    ((count++))
    echo
done
