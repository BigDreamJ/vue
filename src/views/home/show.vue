<template>
  <div class="content">
    <el-card class="card">
      <span class="ql-editor" v-html="content"></span>
    </el-card>
  </div>
</template>

<script>
  import * as api from '@/api/api';
  export default {
    data() {
      return {
        content: null
      }
    },
    mounted() {
      api.blogGetById({id: this.$route.query.blogId}).then(res=>{
        this.content = res.content
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .content{
    .card{
      height: calc(100vh - 200px);
      text-align: left;
      overflow-y: scroll;
    }
  }
</style>
