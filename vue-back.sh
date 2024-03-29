#!/bin/bash
WORK_PATH='/web/vue-server'
cd $WORK_PATH
echo '先清除老代码'
git reset --hard origin/master
git clean -f
echo '拉取最新的代码'
git pull origin master
echo '开始构建，从当前目录开始，构建为vue-server'
docker build -t vue-server:1.0 .
echo '停止旧容器并删除旧容器'
docker stop vue-server-container
docker rm vue-server-container
echo '启动新容器,向外暴露3009，映射宿主的3009 -d是后台运行'
docker container run -p 3009:3009 --name vue-server-container -d vue-server:1.0