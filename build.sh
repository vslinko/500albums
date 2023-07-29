#!/bin/bash

set -e

docker build . --tag docker-registry.vslinko.xyz/vslinko/500albums:latest
docker push docker-registry.vslinko.xyz/vslinko/500albums:latest
