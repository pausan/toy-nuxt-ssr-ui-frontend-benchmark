#!/bin/bash

url="http://127.0.0.1:3000/login"

echo "---- 8t 10c --------------------------------"
wrk -t8 -c10 -d30s --timeout=5 $url
echo "---- 8t 50c --------------------------------"
wrk -t8 -c50 -d30s --timeout=15 $url
echo "---- 16t 100c --------------------------------"
wrk -t16 -c100 -d30s --timeout=15 $url
