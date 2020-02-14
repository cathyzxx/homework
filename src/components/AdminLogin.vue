<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" :rules="loginRules" class="login-form">
      <h1 class="title">{{title}}</h1>
      <el-form-item prop="uname">
        <el-input v-model="form.uname"  prefix-icon="iconfont myIcon-user" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input v-model="form.pwd" prefix-icon="iconfont myIcon-password" placeholder="密码" :type="passwordType"><i slot="suffix" class="iconfont myIcon-eye" @click="showPwd"></i></el-input>
      </el-form-item>
      <div class="login">
        <el-button type="primary" @click="managerLogin" class="login-btn">管理员登录</el-button>
        <el-button type="primary" @click="toLogin" class="login-btn">访问前台</el-button>

      </div>
      <p class="userinfo"><span>账号:</span>admin<span>密码:</span>123456</p>   
    </el-form>

 <!-- 用户注册 -->
  <el-dialog title="新用户注册" :visible.sync="addFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeAdd('addForm')">
  <el-form :model="addForm" class="addForm" :rules="rules" status-icon ref="addForm">
    <el-form-item label="用户名:" :label-width="formLabelWidth" prop="uname">
      <el-input v-model="addForm.uname" auto-complete="off" placeholder="请输入用户名"></el-input>
    </el-form-item>
     <el-form-item label="密码:" :label-width="formLabelWidth" prop="pwd">
      <el-input  prefix-icon="iconfont myIcon-password" v-model="addForm.pwd" auto-complete="off" placeholder="请输入密码" :type="passwordType"><i slot="suffix" class="iconfont myIcon-eye" @click="showPwd"></i></el-input>
    </el-form-item>
     <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
       <el-input type="password" v-model="addForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
     </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSure('addForm')">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import request from '@/utils/request';
import { isvalidUsername } from "@/utils/validate"
export default {
  name: "login-page",
  data: function() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的账号'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
       var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      title:"管理员您好！欢迎登录音乐管理平台",
      adminLoginUrl:"./adminLogin",
      addUrl: "./register",  checkUrl: "./checkUname", 
      addFormVisible: false,
      uname:"",
      pwd:"",
      form: {
        uname: "",
        pwd: ""
      },
       addForm: {
        uname: "",
        pwd: "",
        checkPass: '',
      },
      formLabelWidth: "120px",
      loginRules:{
        uname: [{ required: true, trigger: 'blur', validator: validateUsername }],
        pwd: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      rules: {
        uname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pwd: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
        checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
      },
      passwordType:"password",
    };
  },
  methods: {
     add() {
      this.addFormVisible = true;
    },

    // 关闭注册页面
    closeAdd: function(formName) {
      this.$refs[formName].resetFields();
    },
    // 用户注册
    addSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this;
          var addObj = this.addForm;
          request({
            url: this.checkUrl,
            method: "post",
            data: addObj
          })
            .then(response => {
              if (response.data.status == "success") {
                request({
                  url: this.addUrl,
                  method: "post",
                 data: addObj
                })
                .then(response => {
                  if (response.data.status == "success") {
                    this.$message({
                    message: "用户注册成功",
                    type: "success",
                    });
                    this.addFormVisible = false;
                  } else {
                    this.$message({
                      message: "用户名或密码错误，请重新输入",
                      type: "error"
                    });
                  }
                }) 
              } else {
                this.$message({
                  message: "该用户名已被注册，请重新输入",
                  type: "error"
                });
              }
            }) 
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 管理员登录
    managerLogin() {
        var $this = this;
        this.$refs.form.validate(valid => {
              if (valid) {
                request({
                  url:this.adminLoginUrl,
                  method:"post",
                  data:this.form,
              })
              .then(response => {
                if (response.data.status == "success") {
                    $this.$router.push({path:"/album"});
                }else{
                  this.$message({
                  message: "用户名或密码错误，请重新输入",
                  type: "error"
                });
                }
              })
              .catch((error) => {
                  console.log(error)
              });
          } else {
            console.log("不请求")
          }
      })   
    },
   // 跳转到前台登录页面
    toLogin() {
         var $this = this;
        $this.$router.push({path:"/login"});
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

  },
  mounted: function() {

  }
};
</script>



<style lang="scss" rel="stylesheet/scss">

.login-container{
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/adminLoginBg.jpg");
  background-repeat:no-repeat;
  background-size: cover;
  position: fixed;
  color: #fff;
    .title{
      font-size: 20px;
      margin: 0;
      padding: 40px 0;
    }
    .addArea .el-input {
  width: 200px;
}

.addForm {
  overflow: hidden;
}
.addForm .el-form-item {
  float: left;
}
.addFormArea {
  .el-dialog__body {
    height: 180px;
  }
  .el-dialog__header .el-dialog__title {
    text-align: left;
  }
}
    .el-input__inner{
      padding-left: 40px;
    }
    .el-form-item{
      margin-bottom:40px;
    }
    .el-input{
      width: 84%;
      input{
        background: transparent;
        color: blue;
        height: 50px;
      }
    }
    .login-form{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:0;
      width: 620px;
      padding: 35px 50px 15px;
      margin: 120px auto;
  }
  .title,.login{
    text-align: center;
  }
  .login-btn{
    width: 150px;
  }
  .userinfo{
    text-align: center;
    font-style: italic;
    span{
      padding:0 10px;
    }
  }
} 

</style>


