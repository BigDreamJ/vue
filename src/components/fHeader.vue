<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      type="flex"
      :router="true">
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/edit">新增博客</el-menu-item>
      <el-menu-item index="/map">疫情地图</el-menu-item>
      <!--          <el-menu-item index="4" disabled>消息中心</el-menu-item>-->
      <!--          <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "fheader",
    data(){
      return {
        activeIndex: '1',
      }
    }
  }
</script>

<style scoped>
  el-menu{
    padding: 0;
  }

</style>
