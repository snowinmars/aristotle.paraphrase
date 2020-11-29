echo off

call set_vars.bat

echo %block_end%

echo Preparing tests environment...

echo %block_sep%

call stop_all.bat

call run_db.bat

timeout 3

call deploy_db.bat

call src\run_ntf_container.bat

timeout 3

call src\run_be_container.bat

timeout 3

echo %block_end%

echo Running tests...

echo %block_sep%

::yarn --cwd ..\..\src\be\Tests\Mocha install 

yarn --cwd ..\..\src\be\Tests\Mocha test

echo %block_end%