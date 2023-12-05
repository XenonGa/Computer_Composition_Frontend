<template>
    <div>
      <div class="header">
        <div class="title">
          计算机硬件基础课程管理平台
        </div>
        <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3">消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu> -->
      </div>
    </div>
    
  
  </template>
  
  <script>
    export default {
      data() {
        return {
          activeIndex: '1',
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
  </script>
  <style>
    .header {
      display: flex;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      height: 60px;
    }
    .title{
      flex-grow: 1;
      margin-top: 15px;
      margin-left: 20px;
      font-size: 20px;
    }
    .el-menu-demo {
      flex-grow: 8;
    }
    .main_part {
      background-color: rgb(244, 243, 243);
      flex-grow: 8;
    }
    .father {
      display: flex;
      height: 900px;
    }
    .el-menu-vertical-demo {
      flex-grow: 1;
    }
  </style>
  