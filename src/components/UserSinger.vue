<template lang="html">
  <div class="list">
      <header>
       <div id="nav">
          <h1>用户{{uname}}您好！欢迎来到歌手页</h1>
          <el-button type="success" @click="searchAlbum()" class="login-btn" >点此进入专辑页</el-button>  |
          <el-button type="warning" @click="logout" class="login-btn" >退出</el-button>
        </div>
     
        <label for="" class="formLabelCss">歌手:</label>
        <el-input v-model="singerName"  class="formInputCss" clearable placeholder="请输入歌手姓名"></el-input>

        <label for="" class="formLabelCss">类别:</label>
        <el-select v-model="singerPosition" class="formInputCss">
            <el-option
              v-for="item in singerPositions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>

        <label for="" class="formLabelCss">性别:</label>
        <el-select v-model="singerSex" class="formInputCss">
            <el-option
              v-for="item in singerSexs"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>

        <el-button type="primary" class="searchBtn" icon="el-icon-search" @keyup.enter.native="search"  @click="search">查询</el-button>
			  <el-button type="text" @click="clear">清空查询条件</el-button>

      </header>
      <main>
        <el-table
        :data="tableData"
        stripe
        element-loading-text="拼命加载中"
        header-row-class-name="tableHeader"
        v-loading.fullscreen.lock="loading"
        empty-text="亲，暂时没有数据哦"
        border
        style="width: 100%">
            <el-table-column
            fixed
            prop="singerName"
            label="歌手"
            align="center"
            width="120">
            </el-table-column>
            <el-table-column
            prop="age"
            label="年龄"
            align="center"
            width="100">
            </el-table-column>
            <el-table-column
            label="性别"
            align="center"
            width="100">
                    <template slot-scope="scope">
                        <i class="iconfont myIcon-man" v-if="scope.row.singerSex=='man'"></i>
                        <i class="iconfont myIcon-woman" v-if="scope.row.singerSex=='woman'"></i>
                        {{jungleSex(scope.row.singerSex)}}
                    </template>
            </el-table-column>
            <el-table-column
            prop="album"
            label="代表作"
            align="center"
            width="150">
            </el-table-column>
            
            <el-table-column
            prop="dowhat"
            label="类别"
            align="center"
            width="163">
                    <template slot-scope="scope">{{junglePosition(scope.row.singerPosition)}}</template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="paginationShow"
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="3"
            layout="total, prev, pager, next, jumper"
            :total="length">
            </el-pagination>
      </main>

    <!-- 新增数据 -->
  <el-dialog title="新增数据" :visible.sync="addFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeAdd('addForm')">
  <el-form :model="addForm" class="addForm" :rules="rules" status-icon ref="addForm">

    <el-form-item label="歌手:" :label-width="formLabelWidth" prop="singerName">
      <el-input v-model="addForm.singerName" auto-complete="off" placeholder="请输入歌手姓名"></el-input>
    </el-form-item>

    <el-form-item label="年龄:" :label-width="formLabelWidth" prop="age">
      <el-input v-model.number="addForm.age" auto-complete="off" placeholder="请输入歌手年龄"></el-input>
    </el-form-item>

    <el-form-item label="性别:" :label-width="formLabelWidth" prop="singerSex">
      <el-select v-model="addForm.singerSex" class="sexArea" placeholder="请输入歌手性别">
        <el-option label="男" value="man"></el-option>
        <el-option label="女" value="woman"></el-option>
      </el-select>
    </el-form-item>

     <el-form-item label="代表作:" :label-width="formLabelWidth" prop="album">
      <el-input v-model="addForm.album" auto-complete="off" placeholder="请输入歌手代表作"></el-input>
    </el-form-item>

    <el-form-item label="类别:" :label-width="formLabelWidth" prop="singerPosition">
      <el-select v-model="addForm.singerPosition" placeholder="请选择歌手类别" class="sexArea" multiple>
        <el-option label="内地" value="neidi"></el-option>
        <el-option label="港澳台" value="gangaotai"></el-option>
        <el-option label="欧美" value="oumei"></el-option>
        <el-option label="日韩" value="rihan"></el-option>
        <el-option label="其他" value="qita"></el-option>
      </el-select>
    </el-form-item>



  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSure('addForm')">确 定</el-button>
  </div>
</el-dialog>

<!-- 修改数据 -->
  <el-dialog title="修改数据" :visible.sync="modifyFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeModify('modifyForm')">
  <el-form :model="modifyForm" class="addForm" :rules="rules" status-icon ref="modifyForm">

    <el-form-item label="歌手:" :label-width="formLabelWidth" prop="singerName">
      <el-input v-model="modifyForm.singerName" auto-complete="off" placeholder="请输入歌手姓名"></el-input>
    </el-form-item>

    <el-form-item label="年龄:" :label-width="formLabelWidth" prop="age">
      <el-input v-model.number="modifyForm.age" auto-complete="off" placeholder="请输入歌手年龄"></el-input>
    </el-form-item>

    <el-form-item label="性别:" :label-width="formLabelWidth" prop="singerSex">
      <el-select v-model="modifyForm.singerSex" placeholder="请选择歌手性别" class="sexArea">
        <el-option label="男" value="man"></el-option>
        <el-option label="女" value="woman"></el-option>
      </el-select>
    </el-form-item>

     <el-form-item label="代表作:" :label-width="formLabelWidth" prop="album">
      <el-input v-model="modifyForm.album" auto-complete="off" placeholder="请输入歌手代表作"></el-input>
    </el-form-item>

    <el-form-item label="类别:" :label-width="formLabelWidth" prop="singerPosition">
      <el-select v-model="modifyForm.singerPosition" placeholder="请选择歌手类别" class="sexArea" multiple>
        <el-option label="内地" value="neidi"></el-option>
        <el-option label="港澳台" value="gangaotai"></el-option>
        <el-option label="欧美" value="oumei"></el-option>
        <el-option label="日韩" value="rihan"></el-option>
        <el-option label="其他" value="qita"></el-option>
      </el-select>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modifyFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifySure('modifyForm')">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import { removeToken } from "@/utils/user";
export default {
  name: "list",
  data: function() {
    return {
      title: "hello world",
      paginationShow: true,
      singerName: "",
      singerPosition: "",
      uname:"",
      singerPositions: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "内地",
          value: "neidi"
        },
        {
          label: "港澳台",
          value: "gangaotai"
        },
        {
          label: "欧美",
          value: "oumei"
        },
        {
          label: "日韩",
          value: "rihan"
        },
        {
          label: "其他",
          value: "qita"
        }
      ],
      singerSex: "",
      singerSexs: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "男",
          value: "man"
        },
        {
          label: "女",
          value: "woman"
        }
      ],
      // 校验规则
      rules: {
        singerName: [
          { required: true, message: "请输入歌手姓名", trigger: "blur" }
        ],
        singerSex: [
          { required: true, message: "请选择歌手性别", trigger: "change" },
          { required: true, message: "请选择歌手性别", trigger: "blur" }
        ],
        singerPosition: [
          {
            required: true,
            message: "至少选择一个歌手类别",
            trigger: "change"
          },
          { required: true, message: "至少选择一个歌手类别", trigger: "blur" }
        ],
      },
      currentPage: 1, //当前页数
      pageNumber: 1, //第几页
      pageRow: 3, //每页多少条
      length: 0, //共有多少条
      searchUrl: "./getSingerList",
      addUrl: "./addSinger",
      modifyUrl: "./modifySinger",
      deleteUrl: "./deleteSinger",
      tableData: [],
      addFormVisible: false,
      modifyFormVisible: false,
      modifyId: "",
      addForm: {
        singerName: "",
        age: "",
        singerSex: "",
        album: "",
        singerPosition: [],
      },
      modifyForm: {
        singerName: "",
        age: "",
        singerSex: "",
        album: "",
        singerPosition: [],
      },
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    logout(){
      const that=this;
      that.$router.push({path:"/"});
      removeToken();
    },
    // 清除查询条件
    clear() {
      this.singerName = "";
      this.singerPosition = "";
      this.singerSex = "";
    },
    searchAlbum(){
      console.log("!!!!!!"+this.uname),
      this.$router.push({
                      path:'/home',
                      query:{
                      uname:this.uname
                      }
                    })
    },
    //查询
    search() {
      this.paginationShow = false;

      var searchParmas = {
        singerName: this.singerName,
        singerPosition: this.singerPosition,
        singerSex: this.singerSex,
        pageNumber: this.pageNumber,
        pageRow: this.pageRow
      };
      this.loading = true;

      request({
        url: this.searchUrl,
        method: "post",
        data: searchParmas
      })
        .then(response => {
          this.$nextTick(function() {
            this.paginationShow = true;
          });
          this.loading = false;
          if (response.data.status == "success") {
            this.tableData = response.data.singerList;
            this.length = response.data.total;
          } else {
            this.tableData = [];
            this.$message({
              message: "查询出错，请重试!",
              type: "error"
            });
          }
        })
        .catch(error => {
          this.$nextTick(function() {
            this.paginationShow = true;
          });
          console.log(error);
        });

      //每次查询删除本地缓存
      sessionStorage.removeItem("queryParmas");
    },

    //页数改变时出发的函数
    handleCurrentChange: function(val) {
      this.pageNumber = `${val}`;
      this.search();
    },

    // 转换性别
    jungleSex(sex) {
      if (sex == "man") {
        return "男";
      } else if (sex == "woman") {
        return "女";
      } else {
        return "";
      }
    },

    // 转换位置
    junglePosition(position) {
      var singerPositionQuery = {
        neidi: "内地",
        gangaotai: "港澳台",
        rihan: "日韩",
        oumei: "欧美",
        qita: "其他"
      };

      var singerPositionName = [];

      position.forEach(function(elem, index) {
        singerPositionName.push(singerPositionQuery[elem]);
      });

      return singerPositionName.toString();
    },
    // 添加
    add() {
      this.addFormVisible = true;
    },

    // 关闭添加页面
    closeAdd: function(formName) {
      this.$refs[formName].resetFields();
    },
    // 确认添加
    addSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this;
          this.addFormVisible = false;
          //调新增接口,在回调函数中刷新一次
          var addObj = this.addForm;

          request({
            url: this.addUrl,
            method: "post",
            data: addObj
          })
            .then(response => {
              this.loading = false;
              if (response.data.status == "success") {
                this.$message({
                  message: response.data.message,
                  type: "success",
                  onClose: function() {
                    that.search();
                  }
                });
              } else {
                this.$message({
                  message: "新增失败",
                  type: "error"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭dialog的函数
    closeModify: function(formName) {
      this.$refs[formName].resetFields();
    },

    //修改操作
    modify(row) {
      this.modifyFormVisible = true;
      this.modifyForm = Object.assign({}, row);
      this.modifyId = row["_id"];
    },

    // 确认修改
    modifySure(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
          if (valid) {
            request({
        url: `${this.modifyUrl}/${this.modifyId}`,
        method: "put",
        data: this.modifyForm
      })
        .then(response => {
          this.modifyFormVisible = false;
          if (response.data.status == "success") {
            this.$message({
              message: response.data.message,
              type: "success",
              onClose: function() {
                that.search();
              }
            });
          } else {
            console.log(response.data.error);
            this.$message({
              message: "修改失败",
              type: "error",
              onClose: function() {
                that.search();
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },

    // 删除操作
    deleteSinger(id) {
      var that = this;
      var deleteId = id;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: `${this.deleteUrl}/${deleteId}`,
            method: "delete"
          })
            .then(response => {
              if (response.data.status == "success") {
                this.$message({
                  message: "删除成功",
                  type: "success",
                  onClose: function() {
                    that.search();
                  }
                });
              } else {
                this.$message({
                  message: "删除失败",
                  type: "error",
                  onClose: function() {
                    that.search();
                  }
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

  },

  mounted: function() {
    this.search();
    this.uname=this.$route.query.uname;
  }


};
</script>

<style lang="scss">
// header
header {
  padding: 50px 0;
  .formInputCss {
    width: 220px;
    margin-right: 20px;
  }
  .formLabelCss {
    padding: 0 10px;
  }
  .searchBtn {
    margin-left: 30px;
  }
}

// nav
nav {
  padding: 30px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 50px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
// main
main {
  .pagination {
    float: right;
    padding: 30px 0;
  }
}
.tableHeader {
  color: #000;
}

div.list {
  width: 90%;
  margin: 0 auto;
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
.sexArea {
  width: 200px;
}
.addFormArea {
  .el-dialog__body {
    height: 350px;
  }
  .el-dialog__header .el-dialog__title {
    text-align: left;
  }
}
</style>
