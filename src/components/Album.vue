<template lang="html">
  <div class="album">
      <header>
        <div id="nav">
          <h1>管理员您好！欢迎访问音乐平台管理系统</h1>
          <router-link to="/album">专辑管理</router-link> |
          <router-link to="/singer">歌手管理</router-link> |
          <router-link to="/test">mocha测试</router-link> |
          <router-link to="/interface">接口测试</router-link>|
           <el-button type="warning" size="small" @click="logout" class="login-btn" >退出</el-button>
        </div>
    <router-view/>
        <el-button type="primary" class="addBtn" @click="add" icon="el-icon-plus">添加专辑</el-button>
        <label for="" class="formLabelCss">按专辑名:</label>
        <el-input v-model="albumName"  class="formInputCss" clearable placeholder="请输入专辑名称"></el-input>

        <label for="" class="formLabelCss">按歌手:</label>
        <el-select v-model="singer" class="formInputCss" @focus="getSinger()" >
             <el-option v-for="item in singers"
               :key="item._id"
               :label="item.singerName"
               :value="item.singerName">
            </el-option>
        </el-select>

        <el-button type="primary" class="searchBtn" icon="el-icon-search" @keyup.enter.native="search"  @click="search">搜素</el-button>
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
            prop="albumName"
            label="专辑名称"
            align="center"
            width="120">
            </el-table-column>
            <el-table-column
            prop="price"
            label="价格"
            align="center"
            width="100">
            </el-table-column>
            <el-table-column
            prop="albumYear"
            label="发行年份"
            align="center"
            width="150">
            </el-table-column>
            
            <el-table-column
            prop="singer"
            label="歌手"
            align="center"
            width="163">
              <template slot-scope="scope">
                {{scope.row.singer}}
              </template>
            </el-table-column>
            <el-table-column
            label="操作"
            align="center"
            width="360">
            <template slot-scope="scope">
              <el-button size="small" type="success" @click="modify(scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="deleteAlbum(scope.row['_id'])">删除</el-button>
            </template>
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
    <el-form-item label="专辑名称:" :label-width="formLabelWidth" prop="albumName">
      <el-input v-model="addForm.albumName" auto-complete="off" placeholder="请输入专辑名称"></el-input>
    </el-form-item>

    <el-form-item label="价格:" :label-width="formLabelWidth" prop="price">
      <el-input v-model.number="addForm.price" auto-complete="off" placeholder="请输入专辑价格"></el-input>
    </el-form-item>
     <el-form-item label="发行年份:" :label-width="formLabelWidth" prop="albumYear">
      <el-input v-model="addForm.albumYear" auto-complete="off" placeholder="请输入发行年份"></el-input>
    </el-form-item>
    <el-form-item label="歌手:" :label-width="formLabelWidth" prop="singer">
      <el-select v-model="addForm.singer" placeholder="请选择歌手" class="sexArea" multiple @focus="getSinger()">
       <el-option v-for="item in singers"
               :key="item._id"
               :label="item.singerName"
               :value="item.singerName">
      </el-option>
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

    <el-form-item label="专辑名称:" :label-width="formLabelWidth" prop="albumName">
      <el-input v-model="modifyForm.albumName" auto-complete="off" placeholder="请输入专辑名称"></el-input>
    </el-form-item>

    <el-form-item label="价格:" :label-width="formLabelWidth" prop="price">
      <el-input v-model.number="modifyForm.price" auto-complete="off" placeholder="请输入专辑价格"></el-input>
    </el-form-item>
    <el-form-item label="发行年份:" :label-width="formLabelWidth" prop="albumYear">
      <el-input v-model="modifyForm.albumYear" auto-complete="off" placeholder="请输入发行年份"></el-input>
    </el-form-item>

    <el-form-item label="歌手:" :label-width="formLabelWidth" prop="singer">
      <el-select v-model="modifyForm.singer" placeholder="请选择歌手" class="sexArea" multiple @focus="getSinger()">
       <el-option v-for="item in singers"
               :key="item._id"
               :label="item.singerName"
               :value="item.singerName">
      </el-option>
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
  name: "album",
  data: function() {
    return {
      title: "hello world",
      paginationShow: true,
      albumName: "",
      singer: "",
      singers: [],
      isAlbumNameExisted:false,
      // 校验规则
      rules: {
        albumName: [
          { required: true, message: "请输入专辑名称", trigger: "blur" }
        ],
        age: [
          { required: true, message: "请输入专辑价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" }
        ],
        singer: [
          {
            required: true,
            message: "至少选择一个歌手",
            trigger: "change"
          },
          { required: true, message: "至少选择一个歌手", trigger: "blur" }
        ],
      },
      currentPage: 1, //当前页数
      pageNumber: 1, //第几页
      pageRow: 3, //每页多少条
      length: 0, //共有多少条
      searchUrl: "./getAlbumList",searchSingerUrl:"./getSinger",
      addUrl: "./addAlbum",
      modifyUrl: "./modifyAlbum",
      deleteUrl: "./deleteAlbum",
      checkUrl: "./checkAlbumName",
      tableData: [],
      addFormVisible: false,
      modifyFormVisible: false,
      modifyId: "",

      addForm: {
        albumName: "",
        price: "",
        albumYear: "",
        singer: [],
      },
      modifyForm: {
        albumName: "",
        price: "",
        albumYear: "",
        singer: [],
      },
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    getSinger(){
      request({
        url: this.searchSingerUrl,
        method: "post",
      })
        .then(response => {
          this.$nextTick(function() {
          });
          if (response.data.status == "success") {
            this.singers = response.data.singerList;
             console.log(response.data.singerList)
          } else {
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
    // 清除查询条件
    clear() {
      this.albumName = "";
      this.singer = "";
    },
    //多条件查询
    search() {
      this.paginationShow = false;

      var searchParmas = {
        albumName: this.albumName,
        singer: this.singer,
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
            this.tableData = response.data.albumList;
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


      sessionStorage.removeItem("queryParmas");
    },

    handleCurrentChange: function(val) {
      this.pageNumber = `${val}`;
      this.search();
    },
    //logout
     logout(){
      const that=this;
      that.$router.push({path:"/admin-login"});
      removeToken();
    },
    // 添加
    add() {
      this.addFormVisible = true;
    },

    // 关闭添加页面
    closeAdd: function(formName) {
      this.$refs[formName].resetFields();
    },
    //检查同名专辑是否存在
    addSure1(obj) {
          var addObj = obj;
          request({
            url: this.checkUrl,
            method: "post",
            data: addObj
          })
          .then(response => {
              if (response.data.status == "success") {
                this.isAlbumNameExisted=true;
                }
              else
                this.isAlbumNameExisted=false;
            })   
    },
     addSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this;
          this.addFormVisible = false;
          var addObj = this.addForm;
          this.addSure1(addObj);
            request({
            url: this.addUrl,
            method: "post",
            data: addObj
          })
            .then(response => {
              this.loading = false;
              if (response.data.status == "success") {
                              console.log("add succsess ");
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
    deleteAlbum(id) {
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
  }


};
</script>

<style lang="scss" >
header {
  padding: 20px 0;
  .formInputCss {
    width: 150px;
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
  padding: 20px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
}
#nav {
  padding: 20px;
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
    padding: 20px 0;
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
    height: 250px;
  }
  .el-dialog__header .el-dialog__title {
    text-align: left;
  }
}
</style>
