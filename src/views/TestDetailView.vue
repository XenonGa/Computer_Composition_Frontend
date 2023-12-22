<template>
    <div>
      <header1></header1>
      <div class="father">
        <sideBar class="el-menu-vertical-demo"></sideBar>
        <div class="main_part">
            <div class="class-info">
                <div class="class-info-title">
                    考试信息
                </div>
                <div class="class-info-text">
                    考试名：{{ testInfo.testName }}
                </div>
                <div class="class-info-text">
                    考试时间：{{ testInfo.testTime }}
                </div>
                <div class="class-info-text">
                    考试班级：{{ testInfo.testClass }}
                </div>
                <div class="class-info-text">
                    考场数：{{ testInfo.testRoomNum }}
                </div>
                <el-button type="info" round class="class-info-button" @click="allocationVisible = true">为该考试分配考场</el-button>
                <el-button type="primary" round style="margin-left: 30px;" @click="uploadVisible = true">导入学生名单</el-button>
              </div>
            <div class="before-table">
                <div class="table-title">
                    座位分布  
                </div>
                <div class="row-and-column">
                    <el-select v-model="selectedExactRoom" placeholder="请选择">
                        <el-option
                        v-for="item in roomInfo"
                        :key="item.examRoomID"
                        :label="item.examRoomName"
                        :value="item.examRoomID"
                        >
                        </el-option>
                    </el-select>
                    
                    <el-button type="success" round style="margin-left: 50px;" @click="selectClassroom">选择考场</el-button>
                    <el-button type="info" round style="margin-left: 30px;" @click="setInfoVisible = true">设置信息</el-button>
                    <el-button type="success" round style="margin-left: 30px;" @click="isSignIning = true" v-if="!isSignIning">开始签到</el-button>
                    <el-button type="danger" round style="margin-left: 30px;" @click="isSignIning = false" v-else>结束签到</el-button>
                    <el-button type="success" round style="margin-left: 30px;" @click="isSignOuting = true" v-if="!isSignOuting">开始签退</el-button>
                    <el-button type="danger" round style="margin-left: 30px;" @click="isSignOuting = false" v-else>结束签退</el-button>
                    <el-button type="success" round style="margin-left: 30px;" @click="oneTapSignOutStudents">一键签退</el-button>
                    <el-button type="primary" round style="margin-left: 30px;" @click="startInterval">开始监考</el-button>
                    <el-button type="primary" round style="margin-left: 30px;" @click="downloadStudentInfo">导出学生名单</el-button>
                  </div>
                <div class="draw_table" :style="{ width: tableWidth }">
                    <seatInExam v-for="index in row * column" 
                    :key="index"
                    :seatData="seatArray[index - 1]"
                    :isSignIning="isSignIning"
                    :isSignOuting="isSignOuting"
                    :index="index"
                    @seatClick="signInOrSignOut(seatArray[index - 1])"></seatInExam>
                </div>
            </div>
        </div>

        <div class="create-class-dialog">
        <el-dialog title="分配考场" :visible.sync="allocationVisible">
          <div class="create-class-row">
            <div class="class-title">
              本场考试共有{{ testInfo.testRoomNum }}个考场，请为其分配考场。（分配考场的座位数必须大于该考试每一个Room的学生数！）
            </div>
          </div>

          <div v-for="index in roomInfo.length" :key="index">
            <div class="create-class-row">
                <div class="classroom-title" style="margin-top: 10px;margin-right: 20px;">
                    {{ roomInfo[index - 1].examRoomName }}
                </div>
                <div class="classroom-title">
                    学生数：{{ roomInfo[index - 1].examRoomStudentNum }}
                </div>
            </div>
            <el-select v-model="selectedRoom[index - 1].examRoomCaseID" placeholder="请选择" class="selected-room">
                <el-option
                v-for="item in caseInfo"
                :key="item.classroomID"
                :label="item.classroomName + ' 座位数：' + item.classroomSeatNum"
                :value="item.classroomID">
                </el-option>
            </el-select>
          </div>


            <div slot="footer" class="dialog-footer">
            <el-button @click="allocationVisible = false">取 消</el-button>
            <el-button type="primary" @click="allocateClassroom">分配考场</el-button>
            </div>
        </el-dialog>
        </div>

        <div class="create-class-dialog">
        <el-dialog title="导入学生名单" :visible.sync="uploadVisible">

            <div class="create-class-row">
                <div class="classroom-title" style="width: 100px;">
                    设置ID:
                </div>
                <el-input v-model="setRoomID" placeholder="Room ID"></el-input>
            </div>

            <div slot="footer" class="dialog-footer">
            <el-button @click="uploadVisible = false">取 消</el-button>
            <el-button type="primary" @click="openFileManager">导入文件</el-button>
            </div>
        </el-dialog>
        </div>

        <div class="set-info">
          <el-dialog title="设置" :visible.sync="setInfoVisible">
            <div class="create-class-row">
              <div class="class-title">
                JSESSIONID
              </div>
              <el-input v-model="setInfo.cookie" placeholder="cookie"></el-input>
            </div>
            <div class="create-class-row">
              <div class="class-title">
                lvt
              </div>
              <el-input v-model="setInfo.lvt" placeholder="lvt"></el-input>
            </div>
            <div class="create-class-row">
              <div class="class-title">
                lpvt
              </div>
              <el-input v-model="setInfo.lpvt" placeholder="lpvt"></el-input>
            </div>
            <div class="create-class-row">
              <div class="class-title">
                judge平台考场号(CourseID)（以逗号分隔）
              </div>
              <el-input v-model="setInfo.judgeExamID" placeholder="judge平台考场号"></el-input>
            </div>

            <div class="create-class-row">
              <div class="class-title">
                judge平台班级号(CourseFlag)（与考场号对应）
              </div>
              <el-input v-model="setInfo.judgeCourseFlag" placeholder="judge平台CourseFlag"></el-input>
            </div>

              <div slot="footer" class="dialog-footer">
              <el-button @click="setInfoVisible = false">取 消</el-button>
              <el-button type="primary" @click="setInfoForExam">添加设置</el-button>
              </div>
          </el-dialog>
        </div>
    </div>

    <div>
        <input type="file" ref="fileInput" style="display: none" @change="uploadStudentInfo">
    </div>
    </div>
    
  
  </template>
  
  <script>
  import header1 from '@/components/header.vue'
  import sideBar from '@/components/sideBar.vue'
  import seat from '@/components/seat.vue'
  import seatInExam from '@/components/seatInExam.vue'
    export default {
      components: {
        header1, 
        sideBar,
        seat,
        seatInExam
      },
      computed: {
        tableWidth() {
          return this.column * 110 + 'px';
        }
      },
      watch: {
        row(newValue) {
          this.updateArrayLength();
        },
        column(newValue) {
          this.updateArrayLength();
        },
      },
      created() {
        this.initCheckTest();
      },
      data() {
        return {
          activeIndex: '1',
          removeIndex: 0,
          allocationVisible: false,
          setInfoVisible: false,
          uploadVisible: false,
          intervalId: null,
          isSignIning: false,
          isSignOuting: false,
          setInfo: {
            cookie: '',
            lvt: '',
            lpvt: '',
            judgeExamID: '',
            judgeCourseFlag: '',
            examIDList: [],
            courseFlagList: []
          },
          testInfo: {

          },
          seatArray: [],
          row: 0,
          column: 0,
          tableData: [],
          roomInfo: [],
          selectedRoom: [],
          caseInfo: [],
          studentSeatInfo: [],
          selectedExactRoom: '',
          selectedExactRoomCase: '',
          setRoomID: '',
        };
        
      },
      beforeRouteLeave(to, from, next) {
        clearInterval(this.intervalId);
        next();
      },
      methods: {
        startInterval() {
          this.beginInvigilating();
          this.intervalId = setInterval(() => {
            this.beginInvigilating();
          }, 10000);
        },
        initCheckTest() {
          const data = localStorage.getItem('checkTestInfo');
          if (data) {
            this.testInfo = JSON.parse(data);
            var _this = this;
            const send_message_to_backend = JSON.stringify({
                "id": this.testInfo.testID,
            });
            this.$api.exam.postExam_getRoom(send_message_to_backend)
            .then(function (response) {
              console.log(response);
              for(var i = 0; i < response.data.rooms.length; i++) {
                _this.roomInfo.push({
                    examRoomID: response.data.rooms[i].room_id,
                    examRoomName: response.data.rooms[i].room_name,
                    examRoomCaseID: response.data.rooms[i].room_case_id,
                    examRoomStudentNum: response.data.rooms[i].room_stu_num
                });
                _this.selectedRoom.push({
                    examRoomCaseID: ''
                });
              }
              console.log(_this.roomInfo);
            })
            .catch(function (error) {
              console.log(error);
            });

            this.$api.classroom.postClassroom_getAll()
            .then(function (response) {
              console.log(response);
              for(var i = 0; i < response.data.all_cases.length; i++) {
                _this.caseInfo.push({
                    classroomID: response.data.all_cases[i].case_id,
                    classroomName: response.data.all_cases[i].name,
                    classroomSeatNum: response.data.all_cases[i].seat_num,
                    classroomRow: response.data.all_cases[i].x_length,
                    classroomColumn: response.data.all_cases[i].y_length
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          }
        },
        allocateClassroom() {
            for(var i = 0; i < this.selectedRoom.length; i++) {
                if(this.selectedRoom[i].examRoomCaseID === '')
                {
                    this.$message.error('请选择Room ' + (i + 1) + '的考场！');
                    return;
                }
                for(var j = i + 1; j < this.selectedRoom.length; j++) {
                    if(this.selectedRoom[i].examRoomCaseID === this.selectedRoom[j].examRoomCaseID)
                    {
                        this.$message.error('不能重复选择一个考场！');
                        return;
                    }
                }
            }
            for(var i = 0; i < this.selectedRoom.length; i++) {
                this.roomInfo[i].examRoomCaseID = this.selectedRoom[i].examRoomCaseID;
                const send_message_to_backend = JSON.stringify({
                    "room_id": this.roomInfo[i].examRoomID,
                    "case_id": this.selectedRoom[i].examRoomCaseID
                });
                console.log(send_message_to_backend);
                var _this = this;
                this.$api.exam.postExam_setCase(send_message_to_backend) 
                    .then(function (response) {
                        console.log(response);
                        _this.$message({
                        message: '设置考场成功',
                        type: 'success'
                        });
                        _this.selectedRoom[i].examRoomCaseID = '';
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            this.allocationVisible = false;
        },
        selectClassroom() {
            for(var i = 0; i < this.roomInfo.length; i++) {
                if(this.selectedExactRoom === this.roomInfo[i].examRoomID) {
                    this.selectedExactRoomCase = this.roomInfo[i].examRoomCaseID;
                }
            }
            for(var i = 0; i < this.caseInfo.length; i++) {
                if(this.selectedExactRoomCase === this.caseInfo[i].classroomID) {
                    this.row = this.caseInfo[i].classroomRow;
                    this.column = this.caseInfo[i].classroomColumn;
                }
            }
            this.updateArrayLength();

            const send_message_to_backend = JSON.stringify({
                "id": this.selectedExactRoom
            });
            var _this = this;
            this.$api.exam.postExam_getStudentInfo(send_message_to_backend) 
                .then(function (response) {
                    console.log(response);
                    for (var i = 0; i < response.data.stu_infos.length; i++) {
                        _this.seatArray[response.data.stu_infos[i].seat_x].isClicked = true;
                        _this.seatArray[response.data.stu_infos[i].seat_x].num = response.data.stu_infos[i].seat_num;
                        _this.seatArray[response.data.stu_infos[i].seat_x].isRegistered = response.data.stu_infos[i].is_register;
                        _this.seatArray[response.data.stu_infos[i].seat_x].isSubmitted = response.data.stu_infos[i].is_submit;
                        _this.seatArray[response.data.stu_infos[i].seat_x].studentID = response.data.stu_infos[i].stu_id;
                        _this.seatArray[response.data.stu_infos[i].seat_x].studentName = response.data.stu_infos[i].stu_name;
                        _this.seatArray[response.data.stu_infos[i].seat_x].isOut = response.data.stu_infos[i].is_leave;
                        if(_this.seatArray[response.data.stu_infos[i].seat_x].isRegistered) {
                            _this.seatArray[response.data.stu_infos[i].seat_x].statement = '已签到';
                        }
                        else {
                            _this.seatArray[response.data.stu_infos[i].seat_x].statement = '未签到';
                        }
                        if(_this.seatArray[response.data.stu_infos[i].seat_x].isOut) {
                          _this.seatArray[response.data.stu_infos[i].seat_x].statement = '已签退';
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            
        },
        updateArrayLength() {
            this.seatArray.splice(0, this.seatArray.length);
            for (var i = 0; i < this.row * this.column; i++) {
              this.seatArray.push({
                isClicked: false,
                num: '',
                studentID: '',
                studentName: '',
                index: 0,
                isRegistered: false,
                isSubmitted: false,
                statement: ''
              });
            }
        },
        signInOrSignOut(seat) {
          if(this.isSignIning) {
            const send_message_to_backend = JSON.stringify({
                "room_id": this.selectedExactRoom,
                "seat_num": seat.num,
                "is_register": seat.isRegistered
            });
            var _this = this;
            this.$api.exam.postExam_register(send_message_to_backend) 
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
          }  
          else if(this.isSignOuting) {
            const send_message_to_backend = JSON.stringify({
                "room_id": this.selectedExactRoom,
                "seat_num": seat.num,
                "is_leave": seat.isOut
            });
            var _this = this;
            this.$api.exam.postExam_signOutStudent(send_message_to_backend) 
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
          }
            
        },
        setInfoForExam() {
          if(this.setInfo.cookie !== '') {
            const send_message_to_backend = JSON.stringify({
                "cookie": this.setInfo.cookie,
                "lvt": this.setInfo.lvt,
                "lpvt": this.setInfo.lpvt
            });
            var _this = this;
            this.$api.exam.postExam_updateCookie(send_message_to_backend) 
              .then(function (response) {
                  console.log(response);
                  _this.$message({
                    message: '设置cookie成功',
                    type: 'success'
                    });
              })
              .catch(function (error) {
                  console.log(error);
              });
          }
          if(this.setInfo.judgeExamID !== '') {
            const regex = /\d+/g;
            const result = this.setInfo.judgeExamID.match(regex);
            // console.log(result);
            this.setInfo.examIDList = result.map(Number);
            // console.log(this.setInfo.examIDList);
            const result2 = this.setInfo.judgeCourseFlag.match(regex);
            this.setInfo.courseFlagList = result2.map(Number);
            console.log(this.setInfo.examIDList);
            console.log(this.setInfo.courseFlagList);
            const data = {
              examIDList: this.setInfo.examIDList,
              courseFlagList: this.setInfo.courseFlagList
            };
            localStorage.setItem('IDAndCourseFlag', JSON.stringify(data));

            this.$message({
              message: '设置judge考场成功',
              type: 'success'
              });
          }
          this.setInfo.cookie = '';
          this.setInfo.lvt = '';
          this.setInfo.lpvt = '';
          this.setInfo.judgeExamID = '';
          this.setInfoVisible = false;
        },
        beginInvigilating() {
          const roomIDList = [];
          for(var i = 0; i < this.roomInfo.length; i++) {
            roomIDList.push(this.roomInfo[i].examRoomID);
          }
          console.log(roomIDList);
          const data = localStorage.getItem('IDAndCourseFlag');
          const list = JSON.parse(data);
          console.log(list.examIDList);

          const send_message_to_backend = JSON.stringify({
                "exam_id_list": list.examIDList,
                "course_id_list": list.courseFlagList,
                "er_id_list": roomIDList
            });
            var _this = this;
            this.$api.exam.postExam_getInformation(send_message_to_backend) 
              .then(function (response) {
                  console.log(response);
                  for(var i = 0; i < response.data.submit_message.length; i++) {
                    if(response.data.submit_message[i].room_num === _this.selectedExactRoom) {
                        // console.log('1111');
                        if(response.data.submit_message[i].score !== '0.00') {
                          // console.log('2222');        
                          var flag = false;  
                          if(response.data.submit_message[i].score === '10.00') {
                            flag = true;
                          } 
                          for(var j = 0; j < _this.row * _this.column; j++) {
                              if(_this.seatArray[j].num === response.data.submit_message[i].seat_num) {
                                // console.log('3333');   
                                _this.seatArray[j].statement = 
                                  response.data.submit_message[i].score + "分";
                                _this.seatArray[j].isSubmitted = flag;
                                break;
                              }
                          }
                        }
                    }
                  }
              })
              .catch(function (error) {
                  console.log(error);
              });
        },
        downloadStudentInfo() {
          const send_message_to_backend = JSON.stringify({
              "er_id": this.selectedExactRoom,
          });
          var _this = this;
          const fileName = this.selectedExactRoom + ".xlsx";
          this.$api.exam.postExam_downloadFinalStudentInfo(send_message_to_backend) 
              .then(function (response) {
                console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName); // Replace with the actual file name
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
              })
              .catch(function (error) {
                  console.log(error);
              });
        },
        openFileManager() {
          this.$refs.fileInput.click();
        },
        async uploadStudentInfo() {
          const room_id = this.setRoomID;
          const exam_id = this.testInfo.testID; 
          const file = this.$refs.fileInput.files[0]; // 获取文件输入框中选择的文件

          const formData = new FormData();
          formData.append('room_num', room_id);
          formData.append('exam_id', exam_id);
          console.log(exam_id);
          formData.append('file', file);
          var _this = this;
          await this.$api.exam.postExam_addNewExamRoom(formData)
          .then(function (response) {
                console.log(response);
                _this.$message({
                message: '添加学生名单成功',
                type: 'success'
                });
                // _this.addOuterVisible = false;
                _this.uploadVisible = false;
                _this.setRoomID = '';
            })
            .catch(function (error) {
                console.log(error);
            });
            this.initCheckTest();
        }, 
        oneTapSignOutStudents() {
          let roomIDList = [];
          console.log("111" + this.selectedExactRoom)
          roomIDList.push(parseInt(this.selectedExactRoom));
          const send_message_to_backend = JSON.stringify({
              "room_id_list": roomIDList
          });
          console.log(send_message_to_backend)
          this.$api.exam.postExam_oneTapSignOutStudents(send_message_to_backend) 
            .then(function (response) {
              console.log(response);
              location.reload();
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
        min-height: 250px;
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
        margin-left: 25%;
        margin-top: 10px;
        margin-bottom: 10px;
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
      width: 700px;
      margin-top: 7px;
    }
    .classroom-title {
      font-size: 17px;
      margin-top: 7px;
    }
    .selected-room {
        margin-bottom: 20px;
        margin-left: 50px;
        width: 400px;
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
        flex-wrap: wrap;
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
  