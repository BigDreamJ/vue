<template>
  <div class="blog">
    <el-form ref="form" :rules="rules" :model="blog" label-width="80px" style="margin-top: 20px">
      <el-container>
        <el-header>
          <el-form-item prop="title"  >
            <el-input v-model="blog.title" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-header>
        <el-main style="padding-bottom: 0px">
          <el-form-item prop="content"  >
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="blog.content"
              show-word-limit
              :rows = "30"
            >
            </el-input>
          </el-form-item>
        </el-main>
        <el-footer>
          <el-button type="primary" round @click="send">发布</el-button>
        </el-footer>
      </el-container>
    </el-form>
<!--    <ol style="margin-left: 200px">-->
<!--      <li style="text-align: left"> <p>Regular text. <code>This is code.</code> Regular text.</p></li>-->
<!--      <li style="text-align: left"> <p>Regular text. <code>This is code.</code> Regular text.</p></li>-->
<!--    </ol>-->

  </div>
</template>

<script>
  import * as api from '@/api/api';
  export default {
    name: "newBlog",
    props:{
      blogId:{
        default: null,
      }
    },
    mounted() {
      if(this.blogId != null && this.blogId != ''){
        api.blogGetById({id: this.blogId}).then(data =>{
          this.blog.title = data.title;
          this.blog.content = data.content;
        })
      }
    },
    data(){
      return{
        blog:{
          title: '',
          content: '',
        },
        rules:{
          title: [
            { required: true, message: '请填写博客标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写博客内容', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      send(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            api.addBlog({title: this.blog.title, content: this.blog.content}).then(data => {
              this.$emit('blog', false)
              this.$emit('index', true)
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
    .blog{
      /*height:calc(100vh - 142px);*/
      height:calc(100vh - 213px);
    }
</style>
