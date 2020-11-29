echo off

call set_vars.bat

echo %block_end%

echo Dropping database...

echo %block_sep%

psql -h localhost -p 5432 -U postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'ariph' AND pid <> pg_backend_pid();"

psql -h localhost -p 5432 -U postgres -c "drop database ariph"

echo %block_end%

echo Creating ariph database...

echo %block_sep%

psql -h localhost -p 5432 -U postgres -c "create database ariph"

echo Database created.

echo %block_end%

