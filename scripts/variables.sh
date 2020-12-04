# Well, shell sucks
# todo [snow]: fix all using http://mywiki.wooledge.org/BashPitfalls https://wiki.bash-hackers.org/start

export ariphIsProduction=false
export productionHost="ariph.ru"
export ariphDockerName="snowinmars"

# logs volume
export ariphLogsVolumeName="ariphLogs"
export ariphLogsVolumeHostPath="/home/${USER}/ariph/logs"

# network
export ariphNetworkName="ariph"
export ariphNetworkSubnet="172.20.0.0/16"

# containers
export ariphBeIp="172.20.0.21"
export ariphBeHostPort=5002
export ariphBeContainerPort=5002
export ariphBePublicUrl="http://ec2-18-192-68-110.eu-central-1.compute.amazonaws.com:5002"
export ariphBe="$ariphDockerName/ariph-be"

export ariphFeIp="172.20.0.22"
export ariphFeHostPort=3000
export ariphFeContainerPort=3000
export ariphFe="$ariphDockerName/ariph-fe"

export ariphTexIp="172.20.0.23"
export ariphTex="$ariphDockerName/ariph-tex"

export ariphNgxIp="172.20.0.30"
export ariphNgxHttpHostPort=80
export ariphNgxHttpContainerPort=80
export ariphNgxHttpHostPorts=443
export ariphNgxHttpContainerPorts=443
export ariphNgx="$ariphDockerName/ariph-ngx"
export ariphLetsencryptHref=""
