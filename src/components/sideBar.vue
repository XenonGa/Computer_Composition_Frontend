<template>
    <div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :router="true">
          <el-menu-item index="main">
            <i class="el-icon-menu"></i>
            <span slot="title">课程管理</span>
          </el-menu-item>
          <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>考场管理</span>
          </template>
            <el-menu-item index="createClassroom">创建考场</el-menu-item>
            <el-menu-item index="classroom">考场管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="test">
            <i class="el-icon-menu"></i>
            <span slot="title">考试</span>
          </el-menu-item>
          <!-- <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">数据分析</span>
          </el-menu-item> -->
          <el-menu-item index="settings">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
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
        },
        jumpToSettings() {
            const currentRoute = this.$route.path;
            if (currentRoute !== '/settings') {
                // 使用 $router.push() 导航到另一个路由
                this.$router.push('/settings');
            } else {
                // 在目标页面时不进行跳转，可以执行其他逻辑
                console.log('当前已经在设置页面');
            }
            
        }
      }
    }
  </script>
  <style>
    .header {
      display: flex;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
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
      font-size: 20px;
      width: 280px;
      background-color: rgb(244, 243, 243);
    }
  </style>
  