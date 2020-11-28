#!/bin/bash
# required:
#    wget
#    docker

set -e

find . -name *.pdf -delete

texTotal=$(find ~+ -name *.tex | wc -l)
count=0

find ~+ -name *.tex | while read f;
do
    ((count=count+1))
    echo && echo && echo && echo && echo
    echo \[ $count / $texTotal \] $f
    cd $(dirname $f)

    docker run --rm \
        -v $(dirname $f):/data \
        snowinmars/latex \
        pdflatex -interaction=batchmode -output-dir=/data $(basename $f)
done

find . -name *.aux -delete
find . -name *.log -delete
find . -name *.tex.swp -delete
find . -name *.bbl -delete
find . -name *.blg -delete
find . -name *.log -delete

texCount=$(find . -name *.tex | wc -l)
pdfCount=$(find . -name *.pdf | wc -l)

echo There are $texCount tex files and $pdfCount pdf files
