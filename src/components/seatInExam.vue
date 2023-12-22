<template>
    <div :class="['seat_block' ,'seat_block' + index, { 'clicked': seatData.isClicked, 'registered': seatData.isRegistered,
                                  'submitted': seatData.isSubmitted, 'out': seatData.isOut }]" @click="handleClick">
      <div class="text">  
        {{ seatData.num }}
      </div>
      <div class="text-id">  
        {{ seatData.studentID }}
      </div>
      <div class="text-name">  
        {{ seatData.studentName }}
      </div>
      <div class="text-statement">  
        {{ seatData.statement }}
      </div>
    </div>
</template>
  
  <script>
    export default {
      props: ['seatData', 'isSignIning', 'isSignOuting', 'index'],
      data() {
        return {
          isClicked: false,
          text: '',
        };
      },
      methods: {
        handleClick() {
          // console.log(this.seatData.isRegistered)
          // console.log(this.seatData.isOut)
            if(this.seatData.num === '') {
                return;
            }
            if(this.isSignIning) {
              this.seatData.isRegistered = !this.seatData.isRegistered;
              if(this.seatData.isRegistered) {
                  this.seatData.statement = '已签到';
              }
              else {
                  this.seatData.statement = '未签到';
              }
            }
            else if(this.isSignOuting) {
              this.seatData.isOut = !this.seatData.isOut;
              const seatBlock = document.querySelector('.seat_block' + this.index);
              console.log(seatBlock)
              // 如果找到了元素，则更改其背景颜色
              if (seatBlock) {
                if(this.seatData.isOut === true) 
                {
                  seatBlock.style.backgroundColor = '#ff0000';
                  this.seatData.statement += ' 已签退';
                }
                else {
                  seatBlock.style.backgroundColor = '#409EFF';
                  this.seatData.statement = this.seatData.statement.replace(" 已签退", "");
                }
              }
            }
            this.$emit('seatClick', { isClicked: this.isClicked, text: this.text });
        },
      }
    }
  </script>
  <style scoped>
    .seat_block {
        width: 100px;
        height: 100px;
        background-color: rgb(189, 189, 189);
        cursor: pointer;
        border-radius: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .seat_block:hover {
        width: 100px;
        height: 100px;
        background-color: rgb(201, 201, 201);
        cursor: pointer;
        border-radius: 10px;
    }

    .clicked {
        background-color: #E6A23C;
    }
    .clicked:hover {
        background-color: #ffbf5f;
    }
    .registered {
        background-color: #409EFF;
    }
    .registered:hover {
        background-color: #5badff;
    }
    .submitted {
      background-color: #67C23A;
    }
    .submitted:hover {
        background-color: #81ca5d;
    }
    .out {
      background-color: #ff0000;
    }
    .out:hover {
        background-color: #ff2e2e;
    }
    .text {
      font-size: 15px;
      text-align: center;
      margin-top: 15px;
      color: #ffffff;
    }
    .text-id {
      font-size: 15px;
      text-align: center;
      color: #ffffff;
    }
    .text-name {
      font-size: 15px;
      text-align: center;
      color: #ffffff;
    }
    .text-statement {
      font-size: 15px;
      text-align: center;
      color: #ffffff;
    }
  </style>
  