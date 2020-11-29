../src/latex/recompile.sh

docker build \
    -t snowinmars/aristotle.paraphrase.fe \
    --file ../Dockerfile \
    ..

docker build \
    -t snowinmars/aristotle.paraphrase.be \
    --file ../be/Dockerfile \
    ..
