echo off

call set_vars.bat

call run_db.bat

call src\run_ntf_container.bat

call src\run_be_container.bat

::>>>>>
echo Running FE container...

echo %block_sep%

docker run -d ^
-p 3000:3000 ^
--net %network_name% ^
--ip %fe_ip% ^
-v %logs_folder%:/var/log/nginx/logs ^
-e REACT_APP_HOST=%ngx_ip% ^
ariph/fe

echo %block_end%

::>>>>>
echo Running NGX container...

echo %block_sep%

docker run -d ^
-p 80:80 ^
-p 443:443 ^
--net %network_name% ^
--ip %ngx_ip% ^
-v %logs_folder%:/var/log/nginx/logs ^
-e BE_HOST=%be_ip% ^
-e FE_HOST=%fe_ip% ^
ariph/ngx

echo %block_end%
