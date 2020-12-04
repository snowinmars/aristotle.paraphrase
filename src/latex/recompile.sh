#!/bin/bash
# required:
#    wget
#    docker

set -e
cd "${0%/*}" # cd to the current dir

# there could be not enough permissions due to docker recompiling
rm -rf `find . -name *.pdf`

texTotal=$(find ~+ -name *.tex | wc -l)

#

echo "Starting latex tectonic container..."
docker run --rm -d \
        -v ~+:/data \
        snowinmars/latex \
        bash -c "while true; do continue ; done"
imageId=$( docker ps | grep $imageName | awk '{print $1;}' )

count=0
find ~+ -name *.tex | while read f;
do
    relativeFilename=$(realpath --relative-to=$PWD $f)
    relativeDir=$(dirname $relativeFilename)

    ((count=count+1))
    echo && echo && echo && echo && echo
    echo \[ $count / $texTotal \] $relativeFilename

    docker exec $imageId \
        tectonic --outdir $relativeDir $relativeFilename
done

find . -name *.aux -delete
find . -name *.log -delete
find . -name *.tex.swp -delete
find . -name *.bbl -delete
find . -name *.blg -delete
find . -name *.log -delete

texCount=$(find . -name *.tex | wc -l)
pdfCount=$(find . -name *.pdf | wc -l)

# stop all latex containers due to its' idling consume a lot of resources

imageName="snowinmars/latex"

ids=$(docker ps | grep $imageName | awk '{print $1;}')
total=$(docker ps | grep $imageName | wc -l)

count=1
echo "Stopping $total containers..."

for id in ${ids}; do
	printf "%-2s / %-2s %-8s is gone" $count $total $(docker stop $id)
    ((count++))
    echo
done

echo There are $texCount tex files and $pdfCount pdf files
