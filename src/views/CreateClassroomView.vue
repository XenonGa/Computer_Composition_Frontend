<template>
    <div>
      <header1></header1>
      <div class="father">
        <sideBar class="el-menu-vertical-demo"></sideBar>
        <div class="main_part"> 
            <div class="title-button">
              <div class="title">
                创建考场
              </div>
              <div class="title-button-button">
                <el-button type="success" round class="submit-button" @click="createClassroom">创建考场</el-button>
              </div>
            </div>
            
            <div class="classroom_info">
                <div class="classroom_info_title">
                    考场名
                </div>
                <el-input v-model="classRoomName" placeholder="请输入考场名" class="classroom_info_input"></el-input>
            </div>
            <div class="draw_title">
                绘制座位图
            </div>
            <div class="draw_info">
                <el-input-number v-model="row"></el-input-number>
                <div class="draw_info_text">
                    行
                </div>
                <el-input-number v-model="column"></el-input-number>
                <div class="draw_info_text">
                    列
                </div>
            </div>
            <div class="draw_table" :style="{ width: tableWidth }">
                <seat v-for="index in row * column" 
                :key="index" @seatClick="seatHandleClick(index)"
                :seatData="seatArray[index - 1]"></seat>
            </div>
        </div>
      </div>
    </div>
    
  
  </template>
  
  <script>
  import header1 from '@/components/header.vue'
  import sideBar from '@/components/sideBar.vue'
  import seat from '@/components/seat.vue'
    export default {
      components: {
        header1, 
        sideBar,
        seat
      },
      created() {
      },
      computed: {
        tableWidth() {
          return this.column * 110 + 'px';
        }
      },
      data() {
        return {
            classRoomName: '',
            row: 0,
            column: 0,
            seatArray: [],
            seatID: 0,
        };
      },
      watch: {
        row(newValue) {
          this.updateArrayLength();
        },
        column(newValue) {
          this.updateArrayLength();
        },
      },
      methods: {
        updateArrayLength() {
          const length = this.row * this.column;
          if (length > this.seatArray.length) {
            const diff = length - this.seatArray.length;
            for (let i = 0; i < diff; i++) {
              this.seatArray.push({
                isClicked: false,
                num: '',
                index: 0
              });
            }
          } else if (length < this.seatArray.length) {
            this.seatArray.splice(length);
          }
        },
        seatHandleClick(index) {
          var trueIndex = index - 1;
          this.seatArray[trueIndex].isClicked = !this.seatArray[trueIndex].isClicked;
          if(this.seatArray[trueIndex].isClicked) {
            this.seatID += 1;
            this.seatArray[trueIndex].num = this.seatID;
            this.seatArray[trueIndex].index = trueIndex;
          }
          else {
            this.seatID -= 1;
          }
        },
        createClassroom() {
          if(this.classRoomName === '') {
            this.$message.error('考场名不得为空！');
            return;
          }
          if(this.row === 0) {
            this.$message.error('行数不得为0！');
            return;
          }
          if(this.column === 0) {
            this.$message.error('列数不得为0！');
            return;
          }
          var seat_case = [];
          for(var i = 0; i < this.seatArray.length; i++) {
            if(this.seatArray[i].isClicked) {
              seat_case.push({
                num: this.seatArray[i].num,
                x: this.seatArray[i].index,
                y: 0
              });
            }
          }
          const send_message_to_backend = JSON.stringify({
            "name": this.classRoomName,
            "x": this.row,
            "y": this.column,
            "seat_case": seat_case
          });
          console.log(send_message_to_backend);
          var _this = this;
          this.$api.classroom.postClassroom_create(send_message_to_backend) 
            .then(function (response) {
                console.log(response);
                _this.$message({
                message: '创建考场成功',
                type: 'success'
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
      }
    }
  </script>
  <style scoped>
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
    }
    .main_part {
      background-color: rgb(244, 243, 243);
      flex-grow: 80;
    }
    .title-button {
      display: flex;
    }
    .submit-button {
      margin-left: 50px;
      margin-top: 25px;
    }
    .title-button-button {
      flex-grow: 8;
    }
    .title {
        font-size: 25px;
        margin-top: 30px;
        margin-left: 30px;
        flex-grow: 4;
    }
    .classroom_info {
        display: flex;
        width: 500px;
        margin-top: 30px;
        margin-left: 30px;
    }
    .classroom_info_title {
        font-size: 17px;
        width: 100px;
        margin-top: 7px;
    }
    .draw_title {
        font-size: 17px;
        margin-top: 30px;
        margin-left: 30px;
    }
    .draw_info {
        display: flex;
        margin-top: 30px;
        margin-left: 30px;
    }
    .draw_info_text {
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 7px;
        font-size: 17px;
    }
    .draw_info_button {
        margin-left: 30px;
    }
    .draw_table {
        margin-top: 30px;
        margin-left: 30px;
        display: flex;
        flex-wrap: wrap;
    }
  </style>
  