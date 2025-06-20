#!/bin/bash
cd /home/kavia/workspace/code-generation/storyspark-64670-294fa651/storyspark_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

