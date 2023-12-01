<template>
    <div>
      <header1></header1>
      <div class="father">
        <sideBar class="el-menu-vertical-demo"></sideBar>
        <div class="main_part">
          <div class="before-table">
            <div class="table-title">
                全部考试
            </div>
            <el-button type="success" @click="addTestVisible = true">添加考试</el-button>
          </div>
          <div class="table">
            <template>
              <el-table
                :data="tableData"
                stripe
                style="width: 70%">
                <el-table-column
                  prop="testName"
                  label="考试"
                  sortable
                  >
                </el-table-column>
                <el-table-column
                  prop="testTime"
                  label="考试时间"
                  sortable
                  >
                </el-table-column>
                <el-table-column
                  prop="testClass"
                  label="考试班级"
                  sortable
                  >
                </el-table-column>
                <el-table-column
                  prop="testRoomNum"
                  label="考场数"
                  sortable
                  >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="checkTest(scope.$index, scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="removeTest(scope.$index, scope.row)" type="text" size="small" class="remove">移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>  
          </div>
        </div>
      </div>

        <div class="add-test">
            <el-dialog title="添加考试" :visible.sync="addTestVisible" width="50%">
                <div class="create-class-row">
                    <div class="class-title">
                        考试名
                    </div>
                    <el-input v-model="addTestInfo.testName" placeholder="考试名"></el-input>
                </div>
                <div class="create-class-row">
                    <div class="class-title">
                        考试时间
                    </div>
                    <div class="block">
                        <el-date-picker
                        v-model="addTestInfo.testTime"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>    
                </div>
                <div class="create-class-row">
                    <div class="class-title">
                        考试班级
                    </div>
                    <el-select v-model="testClass" multiple placeholder="请选择">
                        <el-option
                        v-for="item in classes"
                        :key="item.class_id"
                        :label="item.label"
                        :value="item.class_id">
                        </el-option>
                    </el-select>
                </div>

                <div class="create-class-row">
                    <div class="class-title">
                        考场数
                    </div>
                    <el-input-number v-model="addTestInfo.testRoomNum" :min="1" :max="20" label="描述文字"></el-input-number>
                </div>

                    <div slot="footer" class="dialog-footer">
                    <el-button @click="addTestVisible = false">取 消</el-button>
                    <el-button type="primary" @click="createTest">确认添加</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="remove-class-dialog">
        <el-dialog title="移除课程" :visible.sync="removeTestVisible">
            <div class="remove-class-title">
            移除考试信息如下：
            </div>
            <div class="remove-class-row">
            <div class="remove-class-title">
                考试名：{{ removeTestInfo.testName }}
            </div>
            </div>
            <div class="remove-class-row">
            <div class="remove-class-title">
                考试时间：{{ removeTestInfo.testTime }}
            </div>
            </div>
            <div class="remove-class-row">
            <div class="remove-class-title">
                考试班级：{{ removeTestInfo.testClass }}
            </div>
            </div>
            <div class="remove-class-row">
            <div class="remove-class-title">
                考场数：{{ removeTestInfo.testRoomNum }}
            </div>
            </div>
            <div class="remove-class-title">
            确定要移除该考试吗？
            </div>

            <div slot="footer" class="dialog-footer">
            <el-button @click="removeTestVisible = false">取 消</el-button>
            <el-button type="danger" @click="handleRemoveTest">移除考试</el-button>
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
          modifyVisible: false,
          addTestVisible: false,
          removeTestVisible: false,
          testClass: [],
          addTestInfo: {
            testName: '',
            testTime: '',
            testClass: '',
            testRoomNum: 0,
          },
          removeTestInfo: {
            testID: 0,
            testName: '',
            testTime: '',
            testClass: '',
            testRoomNum: 0,
          },
          tableData: [],
          classes: [], 
        };
        
      },
      created() {
        this.getAllClasses();
        this.getAllExams();
      },
      methods: {
        getAllClasses() {
          var _this = this;
          this.$api.classes.postClass_getAll()
            .then(function (response) {
              console.log(response);
              for(var i = 0; i < response.data.classes.length; i++) {
                _this.classes.push({
                  class_id: response.data.classes[i].class_id,
                  label: response.data.classes[i].name + "_" + response.data.classes[i].teacher + "_" + response.data.classes[i].year + response.data.classes[i].season,
                  value: response.data.classes[i].name + "_" + response.data.classes[i].teacher + "_" + response.data.classes[i].year + response.data.classes[i].season,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        
        getAllExams() {
          var _this = this;
          this.$api.exam.postExam_getAll()
            .then(function (response) {
              console.log(response);
              var testClassString = '';
              for(var i = 0; i < response.data.exam_list.length; i++) {
                for(var j = 0; j < response.data.exam_list[i].all_class_id.length; j++) {
                  if(j != 0) {
                    testClassString += '、';
                  }
                  for(var k = 0; k < _this.classes.length; k++) {
                    if(response.data.exam_list[i].all_class_id[j] === _this.classes[k].class_id) {
                      testClassString += _this.classes[k].value;
                    }
                  }
                }
                _this.tableData.push({
                  exam_id: response.data.exam_list[i].exam_id,
                  testName: response.data.exam_list[i].name,
                  testTime: response.data.exam_list[i].time,
                  testClass: testClassString,
                  testRoomNum: response.data.exam_list[i].room_num
                });
                testClassString = '';
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },

        createTest() {
            if(this.addTestInfo.testName === '') {
            this.$message.error('考试名不得为空！');
            return;
            }
            if(this.addTestInfo.testTime === '') {
            this.$message.error('考试时间不得为空！');
            return;
            }
            if(this.testClass.length === 0) {
            this.$message.error('考试班级不得为空！');
            return;
            }
            var dateString = moment(this.addTestInfo.testTime).format('YYYY-MM-DD HH:mm:ss');
            const send_message_to_backend = JSON.stringify({
              name: this.addTestInfo.testName,
              time: dateString,
              join_class: this.testClass,
              num: this.addTestInfo.testRoomNum
            });

            var allTestClass = '';
            for(var i = 0; i < this.testClass.length; i++) {
              if(i != 0) {
                allTestClass += '、';
              }
              for(var j = 0; j < this.classes.length; j++) {
                if(this.testClass[i] === this.classes[j].class_id) {
                  allTestClass += this.classes[j].value;
                }
              }
            }
            const addMessage = {
                testName: this.addTestInfo.testName,
                testTime: dateString,
                testClass: allTestClass,
                testRoomNum: this.addTestInfo.testRoomNum
            };
            var _this = this;
            this.$api.exam.postExam_create(send_message_to_backend) 
            .then(function (response) {
              console.log(response);
              _this.addTestInfo.testName = '';
              _this.addTestInfo.testTime = '';
              _this.addTestInfo.testClass = '';
              _this.addTestInfo.testRoomNum = '';
              _this.tableData.push(addMessage);
              _this.$message({
              message: '添加考试成功',
              type: 'success'
              });
              _this.addTestVisible = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        },    
        removeTest(index, row) {
            this.removeTestInfo.testName = row.testName;
            this.removeTestInfo.testTime = row.testTime;
            this.removeTestInfo.testClass = row.testClass;
            this.removeTestInfo.testRoomNum = row.testRoomNum;
            this.removeTestInfo.testID = this.tableData[index].exam_id;
            this.removeIndex = index;
            this.removeTestVisible = true;
            console.log(this.removeTestInfo);
        },
        handleRemoveTest() {
          var _this = this;
          const send_message_to_backend = JSON.stringify({
              "id": this.removeTestInfo.testID
          });
          this.$api.exam.postExam_delete(send_message_to_backend)
          .then(function (response) {
            console.log(response);
            _this.removeTestVisible = false;
            _this.$message({
              message: '移除考试成功',
              type: 'success'
            });
            _this.removeTestInfo.testName = '';
            _this.removeTestInfo.testTime = '';
            _this.removeTestInfo.testClass = '';
            _this.removeTestInfo.testRoomNum = '';
            _this.tableData.splice(_this.removeIndex, 1);
          })
          .catch(function (error) {
              console.log(error);
          });
        },
        checkTest(index, row) {
          const data = {
            testName: row.testName,
            testTime: row.testTime,
            testClass: row.testClass,
            testRoomNum: row.testRoomNum,
            testID: this.tableData[index].exam_id
          };
          // 存入localStorage下
          localStorage.setItem('checkTestInfo', JSON.stringify(data));
          this.$router.push('/checkTest');
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
  