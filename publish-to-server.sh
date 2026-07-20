#!/bin/bash
set -e

echo "Building local Docker image..."
docker build -t formular-showcase:latest .

echo "Exporting Docker image..."
docker save formular-showcase:latest > formular-showcase.tar

echo "Transferring image to server via SSH..."
scp formular-showcase.tar tadeo@192.168.1.10:/tmp/
scp -r k8s/ tadeo@192.168.1.10:/tmp/

echo "Importing image into K3s..."
ssh tadeo@192.168.1.10 "sudo k3s ctr images import /tmp/formular-showcase.tar"

echo "Applying K8s manifests..."
ssh tadeo@192.168.1.10 "sudo k3s kubectl apply -f /tmp/k8s/"

echo "Verifying rollout..."
ssh tadeo@192.168.1.10 "sudo k3s kubectl rollout status deployment/formular-showcase"

echo "Cleanup..."
ssh tadeo@192.168.1.10 "rm -rf /tmp/formular-showcase.tar /tmp/k8s"
rm formular-showcase.tar

echo "Deployment successful!"
