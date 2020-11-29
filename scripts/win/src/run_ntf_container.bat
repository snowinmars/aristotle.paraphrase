echo off

echo %block_end%

echo Running NTF container...

echo %block_sep%

docker run -d ^
-p 4697:4697 ^
--net %network_name% ^
--ip %ntf_ip% ^
-v %logs_folder%:/var/log/postgresql ^
-e SHOULD_SEND_EMAIL=true ^
ariph/ntf

echo %block_end%
