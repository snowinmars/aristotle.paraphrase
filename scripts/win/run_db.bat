echo off

call set_vars.bat

call create_psql_folder.bat
call create_logs_folder.bat
call create_subnet.bat

echo %block_end%

::>>>>>
echo Running DB container...

echo %block_sep%

docker run -d ^
-p 5432:5432 ^
--net %network_name% ^
--ip %db_ip% ^
-v %logs_folder%:/var/log/postgresql ^
-v %psql_folder%:/var/lib/postgresql/12/main ^
-e PGDATA=/var/lib/postgresql/data/pgdata ^
ariph/db

echo %block_end%
