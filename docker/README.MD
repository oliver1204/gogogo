## 1. Docker 是什么
### 1.1 虚拟机
- 虚拟机是在一个操作系统里运行另一个操作系统
  - 资源占用多
  - 冗余步骤多
  - 启动速度慢

### 1.2 Linux 容器

- 由于虚拟机的上述缺点，Linux发展出另一种虚拟技术：Linux 容器
- Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。对于容器内部的进程而言，它接触到的各种资源都是虚拟的，从而实现与底层系统的隔离。
  - 启动快
  - 资源占用少
  - 体积小

### 1.3 Docker
- Docker属于 Linux 容器的一种封装，提供简易的容器使用接口，它是目前比较流行的一种 Linux 容器。
- Docker 将应用程序和该程序的依赖打包到一个文件中，就会生成一个虚拟的容器。程序在这个虚拟容器中，就好像在真是的物理机上一样。

### 1.4 Docker 和 虚拟机（KVM）

- 启动速度
  - Docker 秒级启动
  - KVM 分钟级启动
- 轻量级 
  - 容器镜像通常以M为单位，虚拟机以G为单位，容器资源占用小，要比虚拟机部署更快
  - 容器共享宿主机内核，系统级虚拟化，占用资源少，容器性能和物理机接近
  - 虚拟机需要虚拟化一些设备，具有完整的os，开销大，因而降低了性能
- 安全性
  - 由于共享了宿主机内核，只进行隔离，因而隔离性和稳定性不如虚拟机，容器具有一定权限访问宿主机内核，存在一定的安全隐患问题。
- 使用要求
  - KVM 基于硬件的虚拟化，需要硬件CPU虚拟化技术支持
  - 容器共享宿主机内核，可以在主机的内进行，不需要考虑CPU虚拟化技术

### 1.5 Docker 的应用场景
- 节省项目环境部署时间
  - 单项目打包
  - 整套项目打包
  - 新开源技术
- 环境一致性
- 持续集成 Jenkins ci/cd
- 微服务
- 弹性伸缩

### 1.6 Docker 体系结构
- Containerd（容器） 是一个守护进程，使用runC管理容器，向Docker Engine（Docker隐形服务）提供接口
- shim 只负责管理一个容器
- runC 是一个轻量级容器，只用来运行容器

[!image](http://chuantu.xyz/t6/722/1583403781x2890208783.png)

## 2. Docker 的安装

- docker 分为企业版(EE)和社区版(CE)
- [docker-ce](https://docs.docker.com/install/linux/docker-ce/centos/)
- [hub.docker](https://hub.docker.com/)

## 3. Dockerfile 制作
- Docker 的镜像是用一层一层文件组成的
- `docker inspect` 命令可以查看镜像或者容器
- layers就是镜像的层文件，只读不能修改。基于镜像创建的容器会共享这些文件。

### 3.1 编写Dockerfile
|命令      |含义                    |案例|
|:-       |:-:                     |-:|
|FROM     |继承的镜像                |FROM node|
|COPY     |从./app拷贝 到 /app      |COPY ./app /app|
|WORKDIR  |指定工作路径，类似 cd /app |WORKDIR /app|
|RUN      |编译打包阶段运行命令       |RUN npm install|
|EXPOSE   |暴露端口                 |EXPOSE 8096|
|CMD      |容器运行阶段运行命令       | CMD npm run start |

### 3.2 .dockerignore

要排查，不要打包到image重的路径

```js
.git
node_modules
```
