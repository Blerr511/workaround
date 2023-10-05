#!/bin/bash

SSH_KEY_PATH=$1
RDS_HOST=$(cat $2)
INSTANCE_ID=$(cat $3)

[[ -z "$WR_TMP_DATA" ]] && echo "Error: WR_TMP_DATA is not set" && exit 1
[[ -z "$RDS_HOST" ]] && echo "Error: RDS_HOST is not set" && exit 1
[[ -z "$LOCAL_PORT" ]] && echo "Error: LOCAL_PORT is not set" && exit 1

export AWS_PAGER=""

aws ec2 start-instances --instance-ids $INSTANCE_ID

# Wait for the bastion host to be in running state
while [[ $(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query "Reservations[0].Instances[0].State.Name" --output text) != "running" ]]; do
    echo "Waiting for the bastion host to start..."
    sleep 10
done

# Optionally, retrieve the public IP in case it changed after starting
HOST=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query "Reservations[0].Instances[0].PublicIpAddress" --output text)

chmod 400 $SSH_KEY_PATH

echo "ssh -o StrictHostKeyChecking=no -f -N -L $LOCAL_PORT:$RDS_HOST -i $SSH_KEY_PATH ec2-user@$HOST"

ssh -o StrictHostKeyChecking=no -f -N -L $LOCAL_PORT:$RDS_HOST -i $SSH_KEY_PATH ec2-user@$HOST

pid=$(pgrep -n -f "ssh -o StrictHostKeyChecking=no -f -N -L $LOCAL_PORT:$RDS_HOST -i $SSH_KEY_PATH ec2-user@$HOST")

echo "SSH process pid: $pid"

echo $pid >$WR_TMP_DATA/ssh_tunnel_pid.txt
