#!/bin/bash

export AWS_PAGER=""

INSTANCE_ID=$(cat $1)

[[ -z "$WR_TMP_DATA" ]] && echo "Error: WR_TMP_DATA is not set" && exit 1
[[ -z "$INSTANCE_ID" ]] && echo "Error: INSTANCE_ID is not set" && exit 1

BASTION_PID=$(cat $WR_TMP_DATA/ssh_tunnel_pid.txt)

kill $BASTION_PID

rm $WR_TMP_DATA/ssh_tunnel_pid.txt

aws ec2 stop-instances --instance-ids $INSTANCE_ID

# Wait for the bastion host to be in stopped state
while [[ $(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query "Reservations[0].Instances[0].State.Name" --output text) != "stopped" ]]; do
    echo "Waiting for the bastion host to stop..."
    sleep 10
done
