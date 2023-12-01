<template>
    <div>
      <header1></header1>
      <div class="father">
        <sideBar class="el-menu-vertical-demo"></sideBar>
        <div class="main_part">
        <div class="setting">
            设置
        </div>
        <div class="button">
            <el-button type="primary" round  @click="settingVisible = true">修改密钥</el-button>
        </div>
        </div>
      </div>


      <el-dialog
        title="修改密钥"
        :visible.sync="settingVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <div class="password">
            旧秘钥
          </div> 
          <el-input placeholder="请输入旧秘钥" v-model="old_password" show-password></el-input>
        </div>
        <div>
          <div class="password">
            新秘钥
          </div> 
          <el-input placeholder="请输入新秘钥" v-model="new_password" show-password></el-input>
        </div>
        <div>
          <div class="password">
            确认新秘钥
          </div> 
          <el-input placeholder="请重复输入秘钥" v-model="repeat_password" show-password></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="settingVisible = false">取 消</el-button>
          <el-button type="primary" @click="changePassword">确 定</el-button>
        </span>
      </el-dialog>
      
    </div>
    
  
  </template>
  
  <script>
  import header1 from '@/components/header.vue'
  import sideBar from '@/components/sideBar.vue'
    export default {
      components: {
        header1, 
        sideBar
      },
      data() {
        return {
          activeIndex: '1',
          settingVisible: false,
          old_password: '',
          new_password: '',
          repeat_password: '',
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        async changePassword() {
          var _this = this;
          var truePassword = '';

          if(this.old_password === '') {
            this.$message.error('请填写旧秘钥！');
            return;
          }
          if(this.new_password === '') {
            this.$message.error('请填写新秘钥！');
            return;
          }
          if(this.repeat_password === '') {
            this.$message.error('请重复输入秘钥！');
            return;
          }
          if (this.new_password !== this.repeat_password) {
            this.$message.error('新秘钥与重复输入的秘钥不一致');
          }

          await this.$api.password.postPassword_get() 
            .then(function (response) {
                console.log(response);
                truePassword = response.data.password;
                if (_this.old_password !== truePassword) {
                  _this.$message.error('旧秘钥输入错误！');
                  return;
                }
            })
            .catch(function (error) {
                console.log(error);
          });
          const send_message_to_backend = JSON.stringify({
            "password": _this.new_password
          });
          await this.$api.password.postPassword_update(send_message_to_backend) 
            .then(function (response) {
                console.log(response);
                // 上传秘钥
                _this.settingVisible = false;
                _this.old_password = '';
                _this.new_password = '';
                _this.repeat_password = '';
                _this.$message({
                  message: '修改秘钥成功',
                  type: 'success'
                });
            })
            .catch(function (error) {
                console.log(error);
          });

        },
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
      flex-grow: 80;
    }
    /* @media screen and (min-width: 960px) {
      .main_part {
        background-color: aqua;
      }
    }
    @media screen and (min-width: 750px) and (max-width: 960px){
      .main_part {
        background-color:yellow;
      }
    }
    @media screen and (max-width: 750px){
      .main_part {
        background-color: brown;
      }
    } */
    .father {
      display: flex;
      height: 900px;
    }
    .el-menu-vertical-demo {
      flex-grow: 1;
    }
    .setting {
        font-size: 30px;
        margin-left: 30px;
        margin-top: 30px;
        padding-bottom: 30px;
    }
    .button {
        margin-left: 40px;
    }
    .password {
      padding-bottom: 10px;
      padding-top: 10px;
    }
  </style>
  