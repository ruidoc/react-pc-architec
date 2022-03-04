# react-pc-architec

React 前端项目架构和编码风格介绍。已删除业务代码，只保留项目结构

- 来源：杨成功
- 时间：2021-02-23

## 项目结构

```sh
|-- .github
|   |-- workflows # CI/CD 目录
|       |-- release.yml # 生产配置
|       |-- staging.yml # 测试配置
|-- .dockerignore
|-- .gitignore
|-- Dockerfile # docker构建文件
|-- package.json
|-- tsconfig.json # ts 配置
|-- yarn.lock
|-- build # 打包生成目录
|-- config
|   |-- app.nginx.conf # nginx 配置，构建容器使用
|   |-- webpack.config.js # webpack配置
|-- public # 入口目录
|   |-- favicon.ico
|   |-- index.html
|-- scripts
|   |-- build.js # build 命令脚本
|   |-- start.js # start 命令脚本
|   |-- test.js
|-- src
    |-- index.tsx # 入口文件
    |-- assets # 资源目录
    |-- components # 组件目录
    |   |-- header
    |   |   |-- index.tsx
    |   |   |-- index.less
    |-- models # mobx 数据目录
    |   |-- admin.tsx
    |   |-- global.tsx
    |   |-- index.tsx
    |-- pages # 视图目录
    |   |-- Home.tsx # 首页
    |   |-- Login.tsx # 登录页
    |   |-- admins
    |   |   |-- index.tsx
    |   |   |-- index.less
    |-- request
    |   |-- index.ts # axios 实例，全局请求处理
    |-- router
    |   |-- home.tsx
    |   |-- index.tsx
    |   |-- root.tsx
    |-- styles
    |   |-- common.less
    |   |-- index.less
    |   |-- print.less
    |-- utils # 工具目录
        |-- content.tsx
        |-- expofile.ts
        |-- index.ts
        |-- initEnv.ts
```

## 项目介绍

项目是基于 create-react-app 脚手架搭建，技术栈是

**react16 + hook + mobx + ts**

采用 `数据model` 和 `视图view` 分离的设计思想，model 作为全局状态管理，与视图是多对一的关系，在任意 view 上可以使用多个 model，避免相同数据重复请求。

使用 **hook** 组件，相比 class 组件代码更精简清爽，也是 react 推荐的方式。

状态管理使用 **mobx**，相比于 redux 剔除了大量的模板文件，更便于理解，可以大幅提升开发效率。

全面拥抱 ts，接口数据转换为 interface，变量，函数等指定数据类型，出错率大减，效率大增。

标准高效的 **git** 分支管理：

- master
- staging：测试分支
- release：生产部署分支
- dev-\*：开发分支
- fixbug-\*：修复分支

使用 **GitHub Action** 实现 CI/CD，监听 staging 和 release 分支的 push，触发自动构建。

做前端容器化，部署生产环境时将前端项目打包成 docker 镜像，实现更快速的部署。

## 部署

staging 部署，只要修改代码 push 到 staging 分支即可。

部署地址：http://reactpc.ruims.top/
