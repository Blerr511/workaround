FROM docker:20.10.7 as static-docker-source
FROM node:16.17.1-buster
ENV PATH "$PATH:/opt/google-cloud-sdk/bin/"
COPY --from=static-docker-source /usr/local/bin/docker /usr/local/bin/docker
COPY ./build.sh /root/
RUN chmod +x /root/*.sh && /bin/bash -c /root/build.sh
VOLUME ["/root/.config", "/root/.kube"]
