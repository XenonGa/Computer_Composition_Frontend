<template>
  <div>
    <header1></header1>
    <div class="father">
      <sideBar class="el-menu-vertical-demo"></sideBar>
      <div class="main_part">
        <div class="create-class">
          <el-button type="success"  @click="createVisible = true">创建课程</el-button>
        </div>
        <div class="table">
          <template>
            <el-table
              :data="tableData"
              stripe
              style="width: 70%">
              <el-table-column
                prop="name"
                label="课程名"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="year"
                label="年份"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="season"
                label="学期"
                sortable>
              </el-table-column>
              <el-table-column
                prop="teacher"
                sortable
                label="老师">
              </el-table-column>
              <el-table-column
                prop="students"
                sortable
                label="课程人数">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="checkClass(scope.$index, scope.row)" type="text" size="small">查看课程</el-button>
                  <el-button @click="removeClass(scope.$index, scope.row)" type="text" size="small" class="remove">移除课程</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>  
        </div>
      </div>
    </div>
    
    <div class="create-class-dialog">
      <el-dialog title="创建课程" :visible.sync="createVisible">
        <div class="create-class-row">
          <div class="class-title">
            课程名称
          </div>
          <el-input v-model="createClassInfo.name" placeholder="课程名称"></el-input>
        </div>
        <div class="create-class-row">
          <div class="class-title" style="margin-right: 28px;">
            课程时间
          </div>
          <el-input v-model="createClassInfo.year" placeholder="课程年份" style="margin-right: 20px;"></el-input>
          <el-select v-model="createClassInfo.season" placeholder="请选择">
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
          <el-input v-model="createClassInfo.teacher" placeholder="教师名"></el-input>
        </div>


        <div slot="footer" class="dialog-footer">
          <el-button @click="createVisible = false">取 消</el-button>
          <el-button type="primary" @click="createClass">创建课程</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="remove-class-dialog">
      <el-dialog title="移除课程" :visible.sync="removeVisible">
        <div class="remove-class-title">
          移除课程信息如下：
        </div>
        <div class="remove-class-row">
          <div class="remove-class-title">
            课程名称：{{ removeClassInfo.name }}
          </div>
        </div>
        <div class="remove-class-row">
          <div class="remove-class-title">
            课程时间：{{ removeClassInfo.year }}{{ removeClassInfo.season }}
          </div>
        </div>
        <div class="remove-class-row">
          <div class="remove-class-title">
            教师名：{{ removeClassInfo.teacher }}
          </div>
        </div>
        <div class="remove-class-title">
          确定要移除该课程吗？
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="removeVisible = false">取 消</el-button>
          <el-button type="danger" @click="handleRemoveClass">移除课程</el-button>
        </div>
      </el-dialog>
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
      this.getAllClasses();
    },
    data() {
      return {
        createVisible: false,
        removeVisible: false,
        activeIndex: '1',
        removeIndex: 0,
        removeClassID: 0,
        createClassInfo: {
          name: '',
          year: '',
          season: '',
          teacher: '',
        },
        removeClassInfo: {
          name: '',
          year: '',
          season: '',
          teacher: '',
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
          name: '计算机硬件基础',
          year: '2023',
          season: '春',
          teacher: '牛建伟',
          students: 100,
        }, {
          name: '计算机硬件基础2',
          year: '2023',
          season: '春',
          teacher: '牛建伟2',
          students: 80,
        }, {
          name: '计算机硬件基础3',
          year: '2023',
          season: '春',
          teacher: '牛建伟3',
          students: 110,
        }, {
          name: '计算机硬件基础4',
          year: '2023',
          season: '春',
          teacher: '牛建伟4',
          students: 60,
        }],

      };
      
    },
    methods: {
      getAllClasses() {
        var _this = this;
        _this.tableData.splice(0, _this.tableData.length);
        this.$api.classes.postClass_getAll()
          .then(function (response) {
            console.log(response);
            _this.tableData.push(...response.data.classes);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      createClass() {
        if(this.createClassInfo.name === '') {
          this.$message.error('课程名不得为空！');
          return;
        }
        if(this.createClassInfo.year === '') {
          this.$message.error('课程年份不得为空！');
          return;
        }
        if(this.createClassInfo.season === '') {
          this.$message.error('课程学期不得为空！');
          return;
        }
        if(this.createClassInfo.teacher === '') {
          this.$message.error('任课教师不得为空！');
          return;
        }
        const createMessage = {
          name: this.createClassInfo.name,
          year: this.createClassInfo.year,
          season: this.createClassInfo.season,
          teacher: this.createClassInfo.teacher,
          students: 0
        };
         // 向后端发送信息
        const send_message_to_backend = JSON.stringify({
          "name": this.createClassInfo.name,
          "teacher": this.createClassInfo.teacher,
          "year": this.createClassInfo.year,
          "season": this.createClassInfo.season
        });
        var _this = this;
        this.$api.classes.postClass_create(send_message_to_backend)
          .then(function (response) {
            console.log(response);
            _this.createClassInfo.name = '';
            _this.createClassInfo.year = '';
            _this.createClassInfo.season = '';
            _this.createClassInfo.teacher = '';
            console.log(createMessage);
            _this.tableData.push(createMessage);
            _this.$message({
              message: '创建课程成功',
              type: 'success'
            });
            _this.createVisible = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      removeClass(index, row) {
        this.removeClassInfo.name = row.name;
        this.removeClassInfo.year = row.year;
        this.removeClassInfo.season = row.season;
        this.removeClassInfo.teacher = row.teacher;
        this.removeIndex = index;
        this.removeClassID = this.tableData[index].class_id;
        console.log("classid:" + this.removeClassID);
        this.removeVisible = true;
      },
      handleRemoveClass() {
        // 向后端发送信息
        const send_message_to_backend = JSON.stringify({
          "id": this.removeClassID,
        });
        var _this = this;
        this.$api.classes.postClass_delete(send_message_to_backend)
          .then(function (response) {
            console.log(response);
            _this.tableData.splice(_this.removeIndex, 1);
            _this.removeVisible = false;
            _this.$message({
              message: '移除课程成功',
              type: 'success'
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      checkClass(index, row) {
        const data = {
          id: this.tableData[index].class_id,
          name: row.name,
          year: row.year,
          season: row.season,
          teacher: row.teacher,
          students: row.students
        };
        // 存入localStorage下
        localStorage.setItem('checkClassInfo', JSON.stringify(data));
        this.$store.state.checkClassInfo.id = this.tableData[index].class_id;
        this.$store.state.checkClassInfo.name = row.name;
        this.$store.state.checkClassInfo.year = row.year;
        this.$store.state.checkClassInfo.season = row.season;
        this.$store.state.checkClassInfo.teacher = row.teacher;
        this.$store.state.checkClassInfo.students = row.students;
        // 很可能要改！！！
        this.$router.push('/class');
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
    flex-grow: 80;
  }
  .father {
    display: flex;
    min-height: 900px;
  }
  .el-menu-vertical-demo {
    flex-grow: 1;
  }
  .create-class {
    margin-top: 20px;
    margin-left: 100px;
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
