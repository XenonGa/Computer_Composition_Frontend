<template>
    <div>
      <header1></header1>
      <div class="father">
        <sideBar class="el-menu-vertical-demo"></sideBar>
        <div class="main_part">
            <div class="class-info">
                <div class="class-info-title">
                    课程信息
                </div>
                <div class="class-info-text">
                    课程名称：{{ classInfo.name }}
                </div>
                <div class="class-info-text">
                    课程时间：{{ classInfo.year }}{{ classInfo.season }}
                </div>
                <div class="class-info-text">
                    教师：{{ classInfo.teacher }}
                </div>
                <el-button type="info" round class="class-info-button" @click="modifyVisible = true">修改课程信息</el-button>
            </div>
          <div class="before-table">
            <div class="table-title">
                学生名单
            </div>
            <el-button type="success"  @click="addOuterVisible = true">添加学生</el-button>
            <el-button type="primary"  @click="downloadStudentsList">导出学生名单</el-button>
          </div>
          <div class="table">
            <template>
              <el-table
                :data="tableData"
                stripe
                style="width: 70%">
                <el-table-column
                  prop="stu_id"
                  label="学号"
                  sortable
                  >
                </el-table-column>
                <el-table-column
                  prop="stu_name"
                  label="姓名"
                  sortable
                  >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="removeStudent(scope.$index, scope.row)" type="text" size="small" class="remove">移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>  
          </div>
        </div>
      </div>

      <div class="create-class-dialog">
        <el-dialog title="修改课程信息" :visible.sync="modifyVisible">
          <div class="create-class-row">
            <div class="class-title">
              课程名称
            </div>
            <el-input v-model="classInfo.name" placeholder="课程名称"></el-input>
          </div>
          <div class="create-class-row">
            <div class="class-title" style="margin-right: 28px;">
              课程时间
            </div>
            <el-input v-model="classInfo.year" placeholder="课程年份" style="margin-right: 20px;"></el-input>
            <el-select v-model="classInfo.season" placeholder="请选择">
              <el-option
                v-for="item in selectSeason"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="create-class-row">
            <div class="class-title">
              教师名
            </div>
            <el-input v-model="classInfo.teacher" placeholder="教师名"></el-input>
          </div>


            <div slot="footer" class="dialog-footer">
            <el-button @click="modifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifyClass">修改课程信息</el-button>
            </div>
        </el-dialog>
        </div>

        <div class="add-student">
            <el-dialog title="添加学生" :visible.sync="addOuterVisible" width="30%">
                <div class="add-student-div">
                    <el-button  type="warning" @click="addInnerVisible = true" style="margin-right: 30px;">学号姓名添加</el-button>
                    <el-button type="primary" @click="openFileManager">批量导入</el-button>
                </div>
                <el-dialog
                width="40%"
                title="添加学生"
                :visible.sync="addInnerVisible"
                append-to-body>
                    <div class="create-class-row">
                    <div class="class-title">
                        学号
                    </div>
                    <el-input v-model="addStudentInfo.stu_id" placeholder="学号"></el-input>
                    </div>
                    <div class="create-class-row">
                    <div class="class-title">
                        姓名
                    </div>
                    <el-input v-model="addStudentInfo.stu_name" placeholder="姓名"></el-input>
                    </div>

                    <div slot="footer" class="dialog-footer">
                    <el-button @click="addOuterVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addStudent">确认添加</el-button>
                    </div>
                </el-dialog>
                <div slot="footer" class="dialog-footer">
                <el-button @click="addOuterVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="remove-class-dialog">
        <el-dialog title="移除课程" :visible.sync="removeStudentVisible">
            <div class="remove-class-title">
            移除学生信息如下：
            </div>
            <div class="remove-class-row">
            <div class="remove-class-title">
                学号：{{ removeStudentInfo.stu_id }}
            </div>
            </div>
            <div class="remove-class-row">
            <div class="remove-class-title">
                姓名：{{ removeStudentInfo.stu_name }}
            </div>
            </div>
            <div class="remove-class-title">
            确定要移除该学生吗？
            </div>

            <div slot="footer" class="dialog-footer">
            <el-button @click="removeStudentVisible = false">取 消</el-button>
            <el-button type="danger" @click="handleRemoveStudent">移除学生</el-button>
            </div>
        </el-dialog>
        </div>

      <div>
        <input type="file" ref="fileInput" style="display: none" @change="addStudentList">
      </div>
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
      created() {
        this.initCheckClass();
      },
      data() {
        return {
          activeIndex: '1',
          removeIndex: 0,
          modifyVisible: false,
          addOuterVisible: false,
          addInnerVisible: false,
          removeStudentVisible: false,
          removeStudentInfo: {
            stu_id: '',
            stu_name: '',
          },
          classInfo: {
            name: '计算机硬件基础',
            year: '2023年',
            season: '春',
            teacher: '牛建伟',
            id: 0,
          },
          addStudentInfo: {
            stu_id: '',
            stu_name: '',
          },
          selectSeason: [{
            value: '春',
            label: '春'
          }, {
            value: '夏',
            label: '夏'
          }, {
            value: '秋',
            label: '秋'
          }, {
            value: '冬',
            label: '冬'
          }],
          tableData: [{
            stu_id: '21373272',
            stu_name: '高嘉轩',
          }, {
            stu_id: '21371195',
            stu_name: '魏润田',
          }, {
            stu_id: '21373219',
            stu_name: '胡斌',
          }, {
            stu_id: '21373272',
            stu_name: '高嘉轩',
          }],
  
        };
        
      },
      methods: {
        initCheckClass() {
          const data = localStorage.getItem('checkClassInfo');
          if (data) {
            this.classInfo = JSON.parse(data);
            // this.classInfo.name = data.name;
            // this.classInfo.year = data.year;
            // this.classInfo.season = data.season;
            // this.classInfo.teacher = data.teacher;
            // this.classInfo.id = data.id;
          }
          const send_message_to_backend = JSON.stringify({
              "id": this.classInfo.id,
          });
          this.tableData.splice(0, this.tableData.length);
          var _this = this;
          this.$api.student.postStudent_get(send_message_to_backend) 
            .then(function (response) {
                console.log(response);
                _this.tableData.push(...response.data.students);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        addStudent() {
            if(this.addStudentInfo.stu_id === '') {
              this.$message.error('请填写学号！');
              return;
            }
          if(this.addStudentInfo.stu_name === '') {
            this.$message.error('请填写姓名！');
            return;
          }
          var _this = this;
          const send_message_to_backend = JSON.stringify({
              "class_id": this.classInfo.id,
              "student_id": this.addStudentInfo.stu_id,
              "student_name": this.addStudentInfo.stu_name
          });
          this.$api.student.postStudent_add(send_message_to_backend)
          .then(function (response) {
                console.log(response);
                _this.$message({
                message: '添加学生成功',
                type: 'success'
                });
                _this.addOuterVisible = false;
                _this.addInnerVisible = false;
                _this.addStudentInfo.stu_id = '';
                _this.addStudentInfo.stu_name = '';
                _this.initCheckClass();
            })
            .catch(function (error) {
                console.log(error);
            });
            
        },
        openFileManager() {
          this.$refs.fileInput.click();
        },
        async addStudentList() {
          const class_id = this.classInfo.id; 
          const file = this.$refs.fileInput.files[0]; // 获取文件输入框中选择的文件

          const formData = new FormData();
          formData.append('class_id', class_id);
          console.log(class_id);
          formData.append('file', file);
          var _this = this;
          await this.$api.student.postStudent_add_list(formData)
          .then(function (response) {
                console.log(response);
                _this.$message({
                message: '添加学生成功',
                type: 'success'
                });
                _this.addOuterVisible = false;
            })
            .catch(function (error) {
                console.log(error);
            });
            this.initCheckClass();
        },
        modifyClass() {
            if(this.classInfo.name === '') {
              this.$message.error('课程名不得为空！');
              return;
            }
            if(this.classInfo.year === '') {
              this.$message.error('课程年份不得为空！');
              return;
            }
            if(this.classInfo.season === '') {
              this.$message.error('课程学期不得为空！');
              return;
            }
            if(this.classInfo.teacher === '') {
              this.$message.error('任课教师不得为空！');
              return;
            }
            var _this = this;
            const send_message_to_backend = JSON.stringify({
              "id": this.classInfo.id,
              "name": this.classInfo.name,
              "teacher": this.classInfo.teacher,
              "year": this.classInfo.year,
              "season": this.classInfo.season
            });
            localStorage.setItem('checkClassInfo', send_message_to_backend);
            this.$api.classes.postClass_update(send_message_to_backend) 
            .then(function (response) {
                console.log(response);
                _this.$message({
                message: '修改课程信息成功',
                type: 'success'
                });
                _this.modifyVisible = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        removeStudent(index, row) {
            this.removeStudentInfo.stu_name = row.stu_name;
            this.removeStudentInfo.stu_id = row.stu_id;
            this.removeIndex = index;
            this.removeStudentVisible = true;
        },
        handleRemoveStudent() {
          var _this = this;
          const send_message_to_backend = JSON.stringify({
              "class_id": this.classInfo.id,
              "student_id": this.removeStudentInfo.stu_id,
              "student_name": this.removeStudentInfo.stu_name
          });
          this.$api.student.postStudent_delete(send_message_to_backend)
          .then(function (response) {
            console.log(response);
            _this.removeStudentVisible = false;
            _this.$message({
              message: '移除学生成功',
              type: 'success'
            });
            _this.removeStudentInfo.stu_id = '';
            _this.removeStudentInfo.stu_name = '';
            _this.initCheckClass();
          })
          .catch(function (error) {
              console.log(error);
          });
            // 向后端发送信息
        },
          downloadStudentsList() {
            const dataObject1 = {
              class_id: this.classInfo.id,
            };
            const fileName = this.classInfo.year + this.classInfo.season + this.classInfo.teacher + ".xlsx";
            const jsonString1 = JSON.stringify(dataObject1);
            this.$api.student.postStudent_download_list(jsonString1)
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
      }
    }
  </script>
  <style scoped>
    .header {
      display: flex;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
    .father {
      display: flex;
      min-height: 900px;
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
  
  </style>
  