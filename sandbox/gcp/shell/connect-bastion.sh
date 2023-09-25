#!/bin/bash

SSH_KEY_PATH=$1
INSTANCE_ID=$(cat $2)

export AWS_PAGER=""

aws ec2 start-instances --instance-ids $INSTANCE_ID

# Wait for the bastion host to be in running state
while [[ $(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query "Reservations[0].Instances[0].State.Name" --output text) != "running" ]]; do
    echo "Waiting for the bastion host to start..."
    sleep 10
done

HOST=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query "Reservations[0].Instances[0].PublicIpAddress" --output text)

chmod 400 $SSH_KEY_PATH

ssh -o StrictHostKeyChecking=no -i $SSH_KEY_PATH ec2-user@$HOST
