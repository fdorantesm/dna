if [[ $1 == up ]]; then
  docker-compose --env-file .env $1 $2
elif [[ $1 == down ]]; then
  docker-compose --env-file .env $1
fi
