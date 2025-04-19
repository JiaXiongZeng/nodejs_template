#!/bin/sh

#Because using Mikro-orm with directory entities exploration, the working directory must be correct!
#NODE_ENV="production" node ./dist/Server.js

#Switch the current working directory to the path "./dist"
cd ./dist
NODE_ENV="production" node ./Server.js
