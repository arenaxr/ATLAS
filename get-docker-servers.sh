#!/bin/bash

sudo docker pull mongo
sudo docker pull redis

sudo docker run --network="host" --name="atlas-mongo" -d mongo:latest
sudo docker run --network="host" --name="atlas-redis" -d redis:latest