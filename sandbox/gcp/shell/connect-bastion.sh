#!/bin/bash

SSH_KEY_PATH=$1
HOST=$(cat $2)

chmod 400 $SSH_KEY_PATH

ssh -i $SSH_KEY_PATH ec2-user@$HOST
