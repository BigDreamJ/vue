<template>
  <div id="app">
    <el-container>
      <el-aside :width=size :style="{backgroundImage:'url(' + picPath + ')'}">
        <div class="title">
          <el-avatar :size="150" :src= headPath style="cursor:pointer;margin-top: 300px" @click.native="change" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
        </div>
      </el-aside>

      <el-container v-show="show">
          <el-header style="padding: 0">
            <f-header></f-header>
          </el-header>
          <vue-audio style="text-align: right"></vue-audio>
          <router-view></router-view>
          <el-footer style="padding: 0">
            <f-footer></f-footer>
          </el-footer>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import VueAudio from './components/VueAudio'
  export default {
    name: 'App',
    components: {
      VueAudio
    },
    watch: {
      size(val){
      }
    },
    data(){
      return {
        drawer: true,
        direction: 'ltr',
        picPath: 'api/pic/coverbg.jpg',
        headPath: 'api/pic/timg.jpg',
        size: "100%",
        show: false,
      }
    },
    methods: {
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
      errorHandler() {
        return true
      },
      change(){
        if(this.size == "100%"){
          this.size = "15%";
          this.show = true;
        }else {
          this.size = "100%";
          this.show = false;
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  el-aside {
  }

  .title{
    background-repeat:no-repeat;
    /*background-size:100% 100%;*/
    -moz-background-size:100% 100%;
    height: calc(100vh);
    background-color: rgba(0, 0, 0, .34);
  }
</style>
