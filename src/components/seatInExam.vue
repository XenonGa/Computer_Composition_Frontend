<template>
    <div :class="['seat_block', { 'clicked': seatData.isClicked, 'registered': seatData.isRegistered,
                                  'submitted': seatData.isSubmitted }]" @click="handleClick">
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
      props: ['seatData'],
      data() {
        return {
          isClicked: false,
          text: '',
        };
      },
      methods: {
        handleClick() {
            if(this.seatData.num === '') {
                return;
            }
            this.seatData.isRegistered = !this.seatData.isRegistered;
            if(this.seatData.isRegistered) {
                this.seatData.statement = '已签到';
            }
            else {
                this.seatData.statement = '未签到';
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
        width: 100px;
        height: 100px;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .clicked:hover {
        background-color: #ffbf5f;
        width: 100px;
        height: 100px;
        cursor: pointer;
        border-radius: 10px;
    }
    .registered {
        background-color: #409EFF;
        width: 100px;
        height: 100px;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .registered:hover {
        background-color: #5badff;
        width: 100px;
        height: 100px;
        cursor: pointer;
        border-radius: 10px;
    }
    .submitted {
      background-color: #67C23A;
        width: 100px;
        height: 100px;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .submitted:hover {
        background-color: #81ca5d;
        width: 100px;
        height: 100px;
        cursor: pointer;
        border-radius: 10px;
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
  