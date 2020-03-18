<template>
  <div class="edit">
    <el-form ref="form" :rules="rules" :model="blog">
      <el-card class="card">
        <!--      <quill-editor v-model="content" ref="myQuillEditor" style="height: 690px;" :options="editorOption">-->
        <!--      </quill-editor>-->
        <el-form-item prop="title">
          <el-input v-model="blog.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <quill-editor v-model="blog.content"
                      ref="myTextEditor"
                      :options="editorOption"
                      style="height: 620px;"
        >
          <div id="toolbar" slot="toolbar">
            <select class="ql-size">
              <option value="small"></option>
              <!-- Note a missing, thus falsy value, is used to reset to default -->
              <option selected></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
            <!-- Add subscript and superscript buttons -->
            <span class="ql-formats"><button class="ql-script" value="sub"></button></span>
            <span class="ql-formats"><button class="ql-script" value="super"></button></span>
            <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
            <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
            <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
            <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
            <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
            <span class="ql-formats"><button type="button" class="ql-link"></button></span>
            <span class="ql-formats">
              <button type="button" @click="imgClick" style="outline:none">
              <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle
                class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill"
                                                                        points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
              </button>
           </span>
            <span class="ql-formats"><button type="button" class="ql-video"></button></span>
          </div>
        </quill-editor>

        <div class="send">
          <el-button  type="primary" round @click="send">发布</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import * as Quill from 'quill'  // 引入编辑器
  import { ImageDrop } from 'quill-image-drop-module'
  import ImageResize from 'quill-image-resize-module'
  import * as api from '@/api/api';
  Quill.register('modules/imageDrop', ImageDrop)
  Quill.register('modules/imageResize', ImageResize)

  export default {
    name: 'FuncFormsEdit',
    components: {
      quillEditor
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
    mounted(){
      if(this.$route.query.blogId != null && this.$route.query.blogId != ''){
        api.blogGetById({id: this.$route.query.blogId}).then(res =>{
          this.blog = res;
        })
      }
    },
    data() {
      return {
        blog:{
          title:'',
          content: null,
        },
        rules:{
          title: [
            { required: true, message: '请填写博客标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写博客内容', trigger: 'blur' }
          ],
        },
        /*上传图片的file控件name*/
        maxUploadSize:{
          type:Number,
          default: 1024 * 1024 * 500
        },
        editorOption: {
          modules: {
            toolbar: '#toolbar',
            imageDrop: true,
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: ['Resize', 'DisplaySize', 'Toolbar']
            }
          },
          // placeholder: '',
          // theme: 'snow',  // or 'bubble'
          // modules: {
          //   imageResize: {}, // 图片调整大小的关键这在这里可以 其他的参数因人而异，
          // }
          // modules: {
          // toolbar: [
          //   [{'size': ['small', false, 'large']}],
          //   ['bold', 'italic'],
          //   [{'list': 'ordered'}, {'list': 'bullet'}],
          //   ['link', 'image']
          // ],
          // history: {
          //   delay: 1000,
          //   maxStack: 50,
          //   userOnly: false
          // },
          // imageDrop: true,
          // imageResize: {
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: ['Resize', 'DisplaySize', 'Toolbar']
          // }
          // }
        }
      }
    },
    methods:{
      send(){
        this.$refs['form'].validate((valid) => {
          if (valid ) {
            if(this.blog.id != null && this.blog.id != undefined && this.blog.id != ''){
              this.$delete(this.blog, 'createTime')
              this.$delete(this.blog, 'updateTime')
              api.updateBlog(this.blog).then(data => {
                this.$notify({title: '跟新成功',message: '更新博客成功', type: 'success', duration: 2000})
                this.$router.push({path:'/'});
              })
            }else {
              api.addBlog(this.blog).then(data => {
                this.$notify({title: '保存成功',message: '新增博客成功', type: 'success', duration: 2000})
                this.$router.push({path:'/'});
              })
            }
          }
        })

      },
      imgClick(){
        // if (!this.uploadUrl) {
        //   console.log('no editor uploadUrl');
        //   return;
        // }
        /*内存创建input file*/
        var input = document.createElement('input');
        input.type = 'file';
        input.name = this.fileName;
        input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
        input.onchange = this.onFileChange;
        input.click()
      },
      onFileChange(e){
        var fileInput = e.target;
        if (fileInput.files.length === 0) {
          return
        }
        this.editor.focus();
        if (fileInput.files[0].size > this.maxUploadSize) {
          this.$alert('图片不能大于500KB', '图片尺寸过大', {
            confirmButtonText: '确定',
            type: 'warning',
          })
        }
        var data = new FormData;
        data.append('file', fileInput.files[0])
        api.upload(data).then(res => {
          if (res) {
            this.editor.insertEmbed(this.editor.getSelection().index, 'image', 'api' +  res.location.split(":")[1] + res.newName)
          }
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  .edit{
    .card{
      height: calc(100vh - 200px);
      .send{
        margin-top: 50px;
      }
    }
  }
</style>
