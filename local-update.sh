#!/bin/bash
currentDirectory=`pwd`
scriptDirectory=`dirname $0`
if [ ! -d $currentDirectory/node_modules/scent-react/dist ]; then
    echo "The scent library is not installed."
    exit 1
fi
cd $scriptDirectory
npx tsc
cd $currentDirectory
cp -r $scriptDirectory/dist/ $currentDirectory/node_modules/scent-react
rm -r $currentDirectory/node_modules/.vite/
