<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="box">
        <!-- <div class="tag">
          <el-tag v-for="(tag, index) in stu_list" 
          :key="index" 
          :type="tag.type" 
          style="margin-top: 15px; margin-right: 20px; font-size: 18px;">{{ index + 1 }} . {{ tag.name }}</el-tag>
        </div> -->
        <div class="son">1</div>
        <div class="son">2</div>
        <div class="son">3</div>
    </div>
  </div>
  
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '北区一号机房'
      }, {
        value: '选项2',
        label: '北区二号机房'
      }, {
        value: '选项3',
        label: '北区三号机房'
      }, {
        value: '选项4',
        label: '北区四号机房'
      }, {
        value: '选项5',
        label: '北区五号机房'
      }],
      value: '',
      stu_list: [{
        name: '高嘉轩',
        isSubmit: true,
        type: "success"
      }, {
        name: '魏润田',
        isSubmit: false,
        type: "danger"
      }, {
        name: '润田',
        isSubmit: false,
        type: "danger"
      }]
    }
  },
}
</script>

<style> 
.box {
  display: flex;
  /* 水平 */
  justify-content: space-between;
  /* 垂直 */
  align-items: center;
  /* 拆行 */
  flex-wrap: wrap;
  /* 子容器垂直布局 */
  /* flex-direction: column; */
  background-color: antiquewhite;
  width: 100%;
  min-width: 900px;
  height: 600px;
}
.tag {
  size: 20px;
}
.son {
  background-color:aquamarine;
  /* width: 35%; */
  height: 100px;
  border: 1px solid green;
}
.box>div:first-child {
  flex-grow: 1;
}
.box>div:nth-child(2) {
  flex-grow: 2;
}
.box>div:nth-child(3) {
  flex-grow: 1;
}
</style>