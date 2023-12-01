<template>
    <div>
      <header1></header1>
      <div class="father">
        <sideBar class="el-menu-vertical-demo"></sideBar>
        <div class="main_part">
            <div class="class-info">
                <div class="class-info-title">
                    考场信息
                </div>
                <div class="class-info-text">
                    考场名：{{ classroomInfo.classroomName }}
                </div>
                <div class="class-info-text">
                    考场座位数：{{ classroomInfo.classroomSeatNum }}
                </div>
            </div>
            <div class="before-table">
                <div class="table-title">
                    座位分布
                </div>
                <div class="row-and-column">
                    <div class="row">
                    {{ row }} 
                    </div>
                    <div class="row-text">
                        行
                    </div>
                    <div class="column">
                        {{ column }} 
                    </div>
                    <div class="column-text">
                        列 
                    </div>
                </div>
                <div class="draw_table" :style="{ width: tableWidth }">
                    <seat v-for="index in row * column" 
                    :key="index" :seatData="seatArray[index - 1]"
                    ></seat>
                </div>
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
      computed: {
        tableWidth() {
          return this.column * 110 + 'px';
        }
      },
      created() {
        this.initCheckClassroom();
      },
      data() {
        return {
          activeIndex: '1',
          removeIndex: 0,
          classroomInfo: {

          },
          seatArray: [],
          row: 0,
          column: 0,
          tableData: [],
  
        };
        
      },
      methods: {
        initCheckClassroom() {
          const data = localStorage.getItem('checkClassroomInfo');
          if (data) {
            this.classroomInfo = JSON.parse(data);
            this.row = this.classroomInfo.classroomRow;
            this.column = this.classroomInfo.classroomColumn;
            for (var i = 0; i < this.row * this.column; i++) {
              this.seatArray.push({
                isClicked: false,
                num: '',
                index: 0
              });
            }
            console.log(this.seatArray);
          }
          const send_message_to_backend = JSON.stringify({
              "id": this.classroomInfo.classroomID,
          });
          var _this = this;
          this.$api.classroom.postClassroom_getSeat(send_message_to_backend) 
            .then(function (response) {
                console.log(response);
                for(var i = 0; i < response.data.seats.length; i++) {
                    _this.seatArray[response.data.seats[i].x].isClicked = true;
                    _this.seatArray[response.data.seats[i].x].num = response.data.seats[i].number;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
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
      flex-grow: 80;
    }
    .class-info {
        margin-top: 20px;
        margin-left: 240px;
        background-color: rgb(255, 255, 255);
        width: 600px;
        height: 150px;
        border-radius: 10px;
        border: 2px solid rgba(50, 48, 48, 0.5);
    }
    .class-info-title {
        font-size: 24px;
        margin-top: 20px;
        margin-left: 20px;
    }
    .class-info-text {
        font-size: 17px;
        margin-left: 40px;
        margin-top: 10px;
    }
    .class-info-button {
        margin-left: 39%;
        margin-top: 10px;
    }
    .father {
      display: flex;
      height: 900px;
    }
    .add-student-div {
        display: flex;
        justify-content: center;
    }
    .el-menu-vertical-demo {
      flex-grow: 1;
    }
    .before-table {
      margin-top: 20px;
      margin-left: 100px;
    }
    .table-title {
        font-size: 25px;
        margin-right: 535px;
    }
    .table {
      margin-top: 20px;
      margin-left: 100px;
    }
    .remove {
      color: red;
    }
    .class-title {
      font-size: 17px;
      width: 120px;
      margin-top: 7px;
    }
    .create-class-row {
      margin-left: 50px;
      margin-bottom: 20px;
      display: flex;
      width: 600px;
    }
    .remove-class-row {
      margin-left: 50px;
      
      display: flex;
      width: 500px;
    }
    .remove-class-title {
      font-size: 17px;
      margin-left: 50px;
      margin-bottom: 20px;
    }
    .row-and-column {
        display: flex;
        margin-top: 20px;
    }
    .row {
        font-size: 25px;
        margin-top: 4px;
        margin-right: 20px;
    }
    .row-text {
        font-size: 25px;
        margin-right: 40px;
    }
    .column {
        font-size: 25px;
        margin-top: 4px;
        margin-right: 20px;
    }
    .column-text {
        font-size: 25px;
    }
    .draw_table {
        margin-top: 30px;
        margin-left: 30px;
        display: flex;
        flex-wrap: wrap;
    }
  </style>
  