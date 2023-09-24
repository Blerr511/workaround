#!/bin/bash

set -e

[[ -z "$WR_TMP_DATA" ]] && echo "Error: WR_TMP_DATA is not set" && exit 1
[[ -z "$INSTANCE_ID" ]] && echo "Error: INSTANCE_ID is not set" && exit 1

BASTION_PID=$(cat $WR_TMP_DATA/ssh_tunnel_pid.txt)

kill $BASTION_PID

aws ec2 stop-instances --instance-ids $INSTANCE_ID
