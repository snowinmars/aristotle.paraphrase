#!/usr/bin/env bash

. variables.sh
set -ex

docker volume list | grep -w $ariphLogsVolumeName
if [[ $? -ne 0 ]]; then
	logsDir=$ariphLogsVolumeHostPath
	mkdir -p ${logsDir}

	docker volume create \
		--opt type=none \
		--opt device=${logsDir} \
		--opt o=bind \
		$ariphLogsVolumeName
fi

docker network list | grep -w $ariphNetworkName
if [[ $? -ne 0 ]]; then
	docker network create --subnet=$ariphNetworkSubnet $ariphNetworkName
fi

be_id=$( docker run -d \
		-p $ariphBeHostPort:$ariphBeContainerPort \
		--net $ariphNetworkName \
		--ip $ariphBeIp \
		-v $ariphLogsVolumeName:/app/_logs \
		-e LATEXDIR=/app/src/latex \
		$ariphBe )

REACT_APP_HOST=$ariphNgxIp
if [[ $ariphIsProduction ]]; then
	echo "Requesting $productionHost"
	REACT_APP_HOST=$productionHost
fi

fe_id=$( docker run -d \
		-p $ariphFeHostPort:$ariphFeContainerPort \
		--net $ariphNetworkName \
		--ip $ariphFeIp \
		-v $ariphLogsVolumeName:/var/log/nginx/logs \
		-e REACT_APP_HOST=$REACT_APP_HOST \
		$ariphFe )

ngx_id=$( docker run -d \
		-p $ariphNgxHttpHostPort:$ariphNgxHttpContainerPort \
		-p $ariphNgxHttpHostPorts:$ariphNgxHttpContainerPorts \
		--net $ariphNetworkName \
		--ip $ariphNgxIp \
		-v $ariphLogsVolumeName:/var/log/nginx/logs \
		-e BE_HOST=$ariphBeIp \
		-e FE_HOST=$ariphFeIp \
		$ariphNgx )

printf "docker %-3s image id is %-64s \n" "ngx" $ngx_id
printf "docker %-3s image id is %-64s \n" "fe" $fe_id
printf "docker %-3s image id is %-64s \n" "be" $be_id

printf "%-12s is listening on %-16s : %-5s , %-5s \n" $ariphNgx $ariphNgxIp $ariphNgxHttpHostPort $ariphNgxHttpHostPorts
printf "%-12s is listening on %-16s : %-5s \n" $ariphFe $ariphFeIp $ariphFeHostPort
printf "%-12s is listening on %-16s : %-5s \n" $ariphBe $ariphBeIp $ariphBeHostPort
