#!/bin/bash

LB_IP=$(kubectl get service "${name}" -o=jsonpath='{.status.loadBalancer.ingress[0].ip}')
echo "{\"ip\": \"$LB_IP\"}"
