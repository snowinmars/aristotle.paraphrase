# Well, shell sucks
# todo [snow]: fix all using http://mywiki.wooledge.org/BashPitfalls https://wiki.bash-hackers.org/start

export ariphIsProduction=false
export productionHost="ariph.ru"
export ariphDockerName="ariph"

# psql volume
export ariphDatabaseVolumeName="ariphPsql"
export ariphDatabaseVolumeHostPath="/home/${USER}/ariph/psql" # you will not have permissions to read this folder

# logs volume
export ariphLogsVolumeName="ariphLogs"
export ariphLogsVolumeHostPath="/home/${USER}/ariph/logs"

# network
export ariphNetworkName="ariph"
export ariphNetworkSubnet="172.18.0.0/16"

# containers
export ariphDbIp="172.18.0.20"
export ariphDbHostPort=5432
export ariphDbContainerPort=5432
export ariphDb="$ariphDockerName/db"
export ariphDatabaseName="ariph"
export ariphDatabaseUser="postgres"

export ariphNtfIp="172.18.0.23"
export ariphNtfHostPort=4697
export ariphNtfContainerPort=4697
export ariphNtf="$ariphDockerName/ntf"

export ariphBeIp="172.18.0.21"
export ariphBeHostPort=50805
export ariphBeContainerPort=50805
export ariphBe="$ariphDockerName/be"
export ariphServerSalt="devServerSaltT6LEb3DcLq9hzm52cSnwW7zvdUwwDCu8O7B1jFu5Yp2rlM8B7ncF61zi0YCiJq4oTKCj0pfLX1WXi5gGPoz0mjkNLQxzCGFvz6fuY9HwCcZqE46jEeN3204yKfjIYiCYG0APbAvOXqXPRwCH"
export ariphJwtIssuer="AriphJwtIssuer"
export ariphJwtAudience="AriphJwtAudience"
export ariphJwtKey="devJwtKey1mo2JGSrDPL90L3f3Hg0jaT6UR4hCY63w43kyNz567LQnUAQbFEam1ijqDq0fwYDHnsCq3Kol0LqIXpg5O07HnsCq3Kol0LqIXpg5O07JLiHEjLp6hEX6GEsg5AEpVu1xcNnaBjVoNwTNCEp0"
export ariphJwtLifetime=15 # min

export ariphFeIp="172.18.0.22"
export ariphFeHostPort=3000
export ariphFeContainerPort=3000
export ariphFe="$ariphDockerName/fe"

export ariphNgxIp="172.18.0.30"
export ariphNgxHttpHostPort=80
export ariphNgxHttpContainerPort=80
export ariphNgxHttpHostPorts=443
export ariphNgxHttpContainerPorts=443
export ariphNgx="$ariphDockerName/ngx"
