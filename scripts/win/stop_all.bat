echo off

call set_vars.bat

echo %block_end%

echo Stopping running containers...

echo %block_sep%

for /f %%i in ('docker ps -q') do docker stop %%i

echo %block_end%

echo Removing stopped containers...

echo %block_sep%

for /f %%i in ('docker ps -a -q') do docker rm %%i

echo %block_end%