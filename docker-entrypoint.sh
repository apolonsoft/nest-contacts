#!/bin/bash
./wait-for-it.sh $MONGODB_HOST:$MONGODB_PORT --timeout=60 --strict

if [ $? -ne 0  ]; then
  echo "MongoDB service is not starting up."
  exit 124
fi

exec "$@"
