echo off

call set_vars.bat

echo %block_end%

echo Ariph logs folder creation...

echo %block_sep%

set result=

for /f %%i in ('docker volume list ^| find %logs_folder%') do set result=%%i

if defined result ^
echo ..No need to create. %logs_folder% already exists.

mkdir %working_folder%\%logs_folder%

if not defined result ^
docker volume create --opt type=none --opt device=%working_folder%\%logs_folder% --opt o=bind %logs_folder%

if not defined result ^
echo Created %logs_folder%.

echo %block_end%
