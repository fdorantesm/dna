#!/bin/sh

if [[ $1 == unzip ]]; then
  yarn envpack --import $2
elif [[ $1 == zip ]]; then
  yarn envpack --export $2
fi
