echo off

call set_vars.bat

echo %block_end%

echo Deploying tables schema...

echo %block_sep%

for /r %%i in (..\..\src\db\schemas_migrations\*.psql) do psql -h localhost -p 5432 -U postgres -f %%i ariph

echo %block_end%

echo Deploying stored procedures...

echo %block_sep%

for /r %%i in (..\..\src\db\procedures_migrations\generation_0\*.psql) do psql -h localhost -p 5432 -U postgres -f %%i ariph
for /r %%i in (..\..\src\db\procedures_migrations\generation_1\*.psql) do psql -h localhost -p 5432 -U postgres -f %%i ariph

echo %block_end%
