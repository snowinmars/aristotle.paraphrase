echo off

call set_vars.bat

echo %block_end%

echo Ariph psql db folder creation...

echo %block_sep%

set result=

for /f %%i in ('docker volume list ^| find %psql_folder%') do set result=%%i

if defined result ^
echo ..No need to create. %psql_folder% already exists.

mkdir %working_folder%\%psql_folder%

if not defined result ^
docker volume create --opt type=none --opt device=%working_folder%\%psql_folder% --opt o=bind %psql_folder%

if not defined result ^
echo Created %psql_folder%.

echo %block_end%
