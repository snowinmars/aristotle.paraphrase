#!/usr/bin/env bash

. variables.sh

docker volume list | grep -w $ariphDatabaseVolumeName
if [[ $? -ne 0 ]]; then
	psqlDir=$ariphDatabaseVolumeHostPath
	mkdir -p ${psqlDir}

	docker volume create \
		--opt type=none \
		--opt device=${psqlDir} \
		--opt o=bind \
		$ariphDatabaseVolumeName
fi

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

db_id=$( docker run -d \
		-p $ariphDbHostPort:$ariphDbContainerPort \
		--net $ariphNetworkName \
		--ip $ariphDbIp \
		-v $ariphLogsVolumeName:/var/log/postgresql \
		-v $ariphDatabaseVolumeName:/var/lib/postgresql/12/main \
		-e PGDATA=/var/lib/postgresql/data/pgdata \
		$ariphDb )

ntf_id=$( docker run -d \
		 -p $ariphNtfHostPort:$ariphNtfContainerPort \
		 --net $ariphNetworkName \
		 --ip $ariphNtfIp \
		 -v $ariphLogsVolumeName:/var/log/postgresql \
		 -e SHOULD_SEND_EMAIL=$ariphIsProduction \
		 $ariphNtf )

be_id=$( docker run -d \
		-p $ariphBeHostPort:$ariphBeContainerPort \
		--net $ariphNetworkName \
		--ip $ariphBeIp \
		-v $ariphLogsVolumeName:/app/_logs \
		-e PSQL_HOST=$ariphDbIp \
		-e PSQL_PORT=$ariphDbHostPort \
		-e PSQL_DATABASE_NAME=$ariphDatabaseName \
		-e PSQL_USER=$ariphDatabaseUser \
		-e NOTIFICATION_HOST=$ariphNtfIp \
		-e NOTIFICATION_PORT=$ariphNtfHostPort \
		-e SERVER_SALT=$ariphServerSalt \
		-e JWT_ISSUER=$ariphJwtIssuer \
		-e JWT_AUDIENCE=$ariphJwtAudience \
		-e JWT_KEY=$ariphJwtKey \
		-e JWT_LIFETIME=$ariphJwtLifetime \
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
printf "docker %-3s image id is %-64s \n" "ntf" $ntf_id
printf "docker %-3s image id is %-64s \n" "db" $db_id

printf "%-12s is listening on %-16s : %-5s , %-5s \n" $ariphNgx $ariphNgxIp $ariphNgxHttpHostPort $ariphNgxHttpHostPorts
printf "%-12s is listening on %-16s : %-5s \n" $ariphFe $ariphFeIp $ariphFeHostPort
printf "%-12s is listening on %-16s : %-5s \n" $ariphBe $ariphBeIp $ariphBeHostPort
printf "%-12s is listening on %-16s : %-5s \n" $ariphNtf $ariphNtfIp $ariphNtfHostPort
printf "%-12s is listening on %-16s : %-5s \n" $ariphDb $ariphDbIp $ariphDbHostPort
