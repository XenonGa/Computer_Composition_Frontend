<template>
    <div :class="['seat_block', { 'clicked': seatData.isClicked }]" @click="handleClick">
      <div class="text">  
        {{ seatData.num }}
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
            this.isClicked = !this.isClicked;
            if(this.isClicked) {
              
            }
            else {
              this.seatData.num = '';
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
        background-color: #409EFF;
        width: 100px;
        height: 100px;
        cursor: pointer;
        border-radius: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .clicked:hover {
        background-color: #71b8ff;
        width: 100px;
        height: 100px;
        cursor: pointer;
        border-radius: 10px;
    }
    .text {
      font-size: 25px;
      text-align: center;
      margin-top: 35px;
      color: #ffffff;
    }
  </style>
  