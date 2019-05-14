FROM node:8.9.2

MAINTAINER Porter Wang

ENV HOME=/app

WORKDIR $HOME
COPY package.json $HOME/package.json
RUN npm install --registry=https://registry.npm.taobao.org

COPY . $HOME

