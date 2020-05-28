<template>
  <div class="index">
    <div class="main">
      <div class="content" v-for="(item,i) in blogContent.records">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
                <span>
<!--                  <el-link target="/show" :underline="false" :title="item.title"><h1>{{item.title}}</h1></el-link>-->
                <router-link :to="{path:'show', query:{blogId: item.id}}" style="float: left;font-size: 14px;width: 80%;"><h1>{{item.title}}</h1></router-link>
                  <div style="float: right">
                <el-button type="primary" round @click="edit(item.id)">编辑</el-button>
                    <el-button type="danger" round @click="remove(item)">删除</el-button>
                  </div>
                </span>
            <!--                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            <!--                <img class="star" style="float: right;width: 50px; height: 50px;" src="../../assets/star.png" />-->
          </div>
          <div style="overflow: hidden;text-overflow:ellipsis;white-space:nowrap;text-align: left ">
            <a href="#" :title="item.title" style="text-decoration:none;color: #222222">{{item.content}}</a>
          </div>
        </el-card>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="blogContent.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import * as api from '@/api/api';
  import newBlog from './newBlog';
  export default {
    name: "index",
    computed: {
      count () {
        return this.$store.state.test.count
      }
    },
    data(){
      return{
        content: "",
        blogContent: [],
        blogId: null,
        page:{
          pageNum: 1,
          pageSize :10,
          total: 0,
        }
      }
    },
    mounted(){
      // console.log(this.count)
      // this.$store.commit('inc', 10)
      // console.log(this.count)
      this.refresh();
    },
    methods:{
      refresh(){
        api.blogPage({pageNum: this.page.pageNum, pageSize: this.page.pageSize}).then(data =>{
          this.blogContent = data;
        })
      },
      edit(blogId){
        this.$router.push({path: '/edit',query: {blogId: blogId}});
      },
      remove(blog){
        this.$confirm('是否删除该篇博客?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$delete(blog, 'createTime')
          this.$delete(blog, 'updateTime')
          api.deleteBlog(blog).then(res =>{
            this.refresh();
            this.$notify({
              title: '成功',
              message: '删除模板成功!',
              type: 'success',
            });
          }), error => {
            this.refresh();
            this.$notify({
              title: '失败',
              message: '删除模板失败，请重试！',
              type: 'error',
            })
          }
        });
      },
      handleSizeChange(val){
        this.page.pageSize = val;
        this.refresh();
      },
      handleCurrentChange(val){
        this.page.pageNum = val;
        this.refresh();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  .index{
    width:100%;
    height:calc(100vh - 198px);

    /*background-color: #D1D1D1;*/
    /*background-image: url(../../assets/timg.jpg);*/
    /*background-image: url(../../assets/Capture001.png);*/
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;}
  .main {
    /*background-color: rgba(0,0,0,0.5);*/
    text-align: center;
    height: calc(100vh - 198px);
    overflow-y:scroll;
    .content {
      margin: 0 auto;
      /*border: 1px solid;*/
      border-radius: 2px;
      width: 80%;

      .box-card {
        /*width: 920px;*/
        margin-bottom: 10px;

        .clearfix:before,
        .clearfix:after {
          display: table;
          content: "";
        }

        .clearfix:after {
          clear: both
        }
      }
    }
  }
</style>
