echo off

call set_vars.bat

echo %block_end%

echo Ariph sub-network creation...

echo %block_sep%

set result=

for /f %%i in ('docker network ls ^| find "ariph"') do set result=%%i

if defined result ^
echo ..No need to create. %network_name% already exists.

if not defined result ^
docker network create --subnet=172.18.0.0/16 %network_name%

if not defined result ^
echo Created %network_name% sub-network.

echo %block_end%
