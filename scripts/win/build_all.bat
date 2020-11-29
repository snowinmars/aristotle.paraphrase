echo off

call set_vars.bat

echo %block_end%

echo Getting git commit hash...

echo %block_sep%

for /f %%i in ('git rev-parse --short HEAD') do set githash=%%i

echo Current hash is %githash%.

echo %block_end%

echo Building DB container...

echo %block_sep%

docker build -t ariph/db ..\..\src\db

echo %block_end%

echo Building NTF container...

echo %block_sep%

docker build -t ariph/ntf --build-arg GIT_HASH=%githash% ..\..\src\ntf

echo %block_end%

echo Building BE container...

echo %block_sep%

docker build -t ariph/be --build-arg GIT_HASH=%githash% ..\..\src\be

echo %block_end%

echo Building FE container...

echo %block_sep%

docker build -t ariph/fe --build-arg REACT_GIT_HASH=%githash% ..\..\src\fe

