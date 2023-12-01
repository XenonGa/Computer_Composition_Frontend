<template>
    <div>
      <header1></header1>
      <div class="father">
        <sideBar class="el-menu-vertical-demo"></sideBar>
        <div class="main_part">
          <div class="before-table">
            <div class="table-title">
                全部考场
            </div>
          </div>
          <div class="table">
            <template>
              <el-table
                :data="tableData"
                stripe
                style="width: 70%">
                <el-table-column
                  prop="classroomName"
                  label="考场名"
                  sortable
                  >
                </el-table-column>
                <el-table-column
                  prop="classroomSeatNum"
                  label="座位数"
                  sortable
                  >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="checkClassRoom(scope.$index, scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="removeClassroom(scope.$index, scope.row)" type="text" size="small" class="remove">移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>  
          </div>
        </div>
      </div>

        <div class="remove-class-dialog">
        <el-dialog title="移除考场" :visible.sync="removeClassroomVisible">
            <div class="remove-class-title">
            移除考场信息如下：
            </div>
            <div class="remove-class-row">
            <div class="remove-class-title">
                考场名：{{ removeClassroomInfo.classroomName }}
            </div>
            </div>
            <div class="remove-class-row">
            <div class="remove-class-title">
                考场座位数：{{ removeClassroomInfo.classroomSeatNum }}
            </div>
            </div>
            <div class="remove-class-title">
            确定要移除该考场吗？
            </div>

            <div slot="footer" class="dialog-footer">
            <el-button @click="removeClassroomVisible = false">取 消</el-button>
            <el-button type="danger" @click="handleRemoveClassroom">移除考场</el-button>
            </div>
        </el-dialog>
        </div>
    </div>
    
  
  </template>
  
  <script>
  import header1 from '@/components/header.vue'
  import sideBar from '@/components/sideBar.vue'
  import moment from 'moment'
    export default {
      components: {
        header1, 
        sideBar
      },
      data() {
        return {
          activeIndex: '1',
          removeIndex: 0,
          removeClassroomVisible: false,
          testClass: [],
          removeClassroomInfo: {
            classroomID: 0,
            classroomName: '',
            classroomSeatNum: 0,
          },
          tableData: [],
        };
        
      },
      created() {
        this.getAllClassrooms();
      },
      methods: {
        getAllClassrooms() {
          var _this = this;
          this.$api.classroom.postClassroom_getAll()
            .then(function (response) {
              console.log(response);
              for(var i = 0; i < response.data.all_cases.length; i++) {
                _this.tableData.push({
                    classroomID: response.data.all_cases[i].case_id,
                    classroomName: response.data.all_cases[i].name,
                    classroomSeatNum: response.data.all_cases[i].seat_num,
                    classroomRow: response.data.all_cases[i].x_length,
                    classroomColumn: response.data.all_cases[i].y_length,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        
        removeClassroom(index, row) {
            this.removeClassroomInfo.classroomName = row.classroomName;
            this.removeClassroomInfo.classroomSeatNum = row.classroomSeatNum;
            this.removeClassroomInfo.classroomID = this.tableData[index].classroomID;
            this.removeIndex = index;
            this.removeClassroomVisible = true;
            console.log(this.removeClassroomInfo);
        },
        handleRemoveClassroom() {
          var _this = this;
          const send_message_to_backend = JSON.stringify({
              "id": this.removeClassroomInfo.classroomID
          });
          this.$api.classroom.postClassroom_delete(send_message_to_backend)
          .then(function (response) {
            console.log(response);
            _this.removeClassroomVisible = false;
            _this.$message({
              message: '移除考场成功',
              type: 'success'
            });
            _this.removeClassroomInfo.classroomName = '';
            _this.removeClassroomInfo.classroomSeatNum = 0;
            _this.removeClassroomInfo.classroomID = 0;
            _this.tableData.splice(_this.removeIndex, 1);
          })
          .catch(function (error) {
              console.log(error);
          });
        },
        checkClassRoom(index, row) {
            const data = {
                classroomID: this.tableData[index].classroomID,
                classroomName: row.classroomName,
                classroomSeatNum: row.classroomSeatNum,
                classroomRow: this.tableData[index].classroomRow,
                classroomColumn: this.tableData[index].classroomColumn
            };
            // 存入localStorage下
            localStorage.setItem('checkClassroomInfo', JSON.stringify(data));
            this.$router.push('/checkClassroom');
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
      flex-grow: 8;
    }
    .class-info {
        margin-top: 20px;
        margin-left: 240px;
        background-color: rgb(255, 255, 255);
        width: 600px;
        height: 220px;
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
      display: flex;
    }
    .table-title {
        font-size: 25px;
        margin-right: 676px;
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
      width: 100px;
      margin-top: 7px;
    }
    .create-class-row {
      margin-left: 50px;
      margin-bottom: 20px;
      display: flex;
      width: 500px;
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
  
  </style>
  