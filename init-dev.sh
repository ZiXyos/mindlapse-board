#!/bin/bash
#
mkcert -install
mkcert "mindboard.local" "*.mindboard.local"
mkdir -p docker/certs
cp mindboard.local+1-key.pem mindboard.local+1.pem docker/certs
rm -r mindboard.local+1*
