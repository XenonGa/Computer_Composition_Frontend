<template>
    <div>
      <header1></header1>
      
      <div class="whole">
        <div class="login-border">
            <div class="title-background">
                <div class="title">
                计算机硬件基础课程管理平台
                </div>
            </div>
            
            <div class="password-div">
                <div class="text">
                    秘钥
                </div>
                <div class="input-div">
                    <el-input placeholder="请输入密钥" v-model="password" show-password class="input"></el-input>
                </div>
            </div>
            <div class="button-div">
                <el-button type="primary" round @click="handleLogin" class="button">登录</el-button>
            </div>
        </div>
      </div>
    </div>
    
  
  </template>
  
  <script>

    export default {
      components: {
        
      },
      data() {
        return {
            password: '',
        };
      },
      methods: {
        handleLogin() {
            // 拿取秘钥
            var _this = this;
            var truePassword = '';
            this.$api.password.postPassword_get() 
            .then(function (response) {
                truePassword = response.data.password;

                if(_this.password === '') {
                    _this.$message.error('秘钥不能为空！');
                }
                else if(_this.password !== truePassword) {
                    _this.$message.error('秘钥错误！');
                }
                else {
                    _this.$router.push('/main');
                    _this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
      }
    }
  </script>
  <style scoped>
.whole {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 800px;
}
.login-border {
    height: 380px;
    width: 650px;
    border: 4px solid rgba(0,0,0, 0.5);
    border-radius: 50px;
}
.title-background {
    border: 2px solid rgb(0, 0, 0);
    border-top-left-radius: 45px;
    border-top-right-radius: 45px;
    background-color: rgba(0,0,0, 0.8);
}
.title {
    text-align: center;
    font-size: 30px;
    color: rgb(185, 205, 222);
    /* border: 1px solid red; */
    margin-top: 60px;
    margin-bottom: 40px;
}
.password-div {
    margin-top: 50px;
    display: flex;
    justify-content: center;
}
.text {
    font-size: 20px;
    margin-right: 20px;
    margin-top: 5px;
}
.input {
    width: 300px;
}
.button-div {
    margin-top: 50px;
    display: flex;
    justify-content: center;
}
.button {
    width: 100px;
}
  </style>
  