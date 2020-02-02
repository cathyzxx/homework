<template lang="html">
  <div class="list">

      <header>
        <div id="nav">
          <router-link to="/album">音乐专辑管理</router-link> |
          <router-link to="/singer">歌手管理</router-link> |
          <router-link to="/test">mocha测试</router-link> |
          <router-link to="/interface">接口测试</router-link>|
          <router-link to="/">登出</router-link> 
    </div>
    <router-view/>
        <label for="" class="formLabelCss">专辑名称:</label>
        <el-input v-model="albumName"  class="formInputCss" clearable placeholder="请输入专辑名称"></el-input>

        <label for="" class="formLabelCss">发行年份:</label>
        <el-select v-model="albumYear" class="formInputCss">
            <el-option
              v-for="item in albumYears"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>

        <label for="" class="formLabelCss">发行地区:</label>
        <el-select v-model="location" class="formInputCss">
            <el-option
              v-for="item in locations"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>

        <el-button type="primary" class="searchBtn" icon="el-icon-search" @keyup.enter.native="search"  @click="search">查询</el-button>
			  <el-button type="text" @click="clear">清空</el-button>

      </header>

      <nav>
        <el-button type="primary" class="addBtn" @click="add" icon="el-icon-plus">添加专辑</el-button>
      </nav>

        
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
            label="发行地区"
            align="center"
            width="100">
                    <template slot-scope="scope">
                        {{jungleLocation(scope.row.location)}}
                    </template>
            </el-table-column>
            <el-table-column
            prop="singers"
            label="歌手"
            align="center"
            width="150">
            </el-table-column>
            
            <el-table-column
            prop="albumYear"
            label="发行年份"
            align="center"
            width="163">
                      <template slot-scope="scope">
                        {{jungleYear(scope.row.albumYear)}}
                    </template>
            </el-table-column>
          
            <el-table-column
            label="操作"
            align="center"
            width="360">
            <template slot-scope="scope">
  <el-button size="small" type="success" @click="modify(scope.row)">修改</el-button>
  <el-button type="danger" size="small" @click="deleteAlbum(scope.row['_id'])">删除</el-button>
  <el-button type="warning" size="small" @click="toggleCollect()">{{collect}}</el-button>
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

    <el-form-item label="发行地区:" :label-width="formLabelWidth" prop="location">
      <el-select v-model="addForm.location" class="sexArea" placeholder="请输入发行地区">
        <el-option label="中国" value="china"></el-option>
        <el-option label="海外" value="abroad"></el-option>
      </el-select>
    </el-form-item>

     <el-form-item label="歌手:" :label-width="formLabelWidth" prop="singers">
      <el-input v-model="addForm.singers" auto-complete="off" placeholder="请输入歌手"></el-input>
    </el-form-item>

    <el-form-item label="发行年份:" :label-width="formLabelWidth" prop="albumYear">
      <el-select v-model="addForm.albumYear" placeholder="请选择发行年份" class="sexArea" multiple>
        <el-option label="2020" value="y2020"></el-option>
        <el-option label="2019" value="y2019"></el-option>
        <el-option label="2018-2000" value="y2018"></el-option>
        <el-option label="90年代" value="y90"></el-option>
        <el-option label="更早" value="other"></el-option>
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

    <el-form-item label="发行地区:" :label-width="formLabelWidth" prop="location">
      <el-select v-model="modifyForm.location" placeholder="请选择发行地区" class="sexArea">
        <el-option label="中国" value="china"></el-option>
        <el-option label="海外" value="abroad"></el-option>
      </el-select>
    </el-form-item>

     <el-form-item label="歌手:" :label-width="formLabelWidth" prop="singers">
      <el-input v-model="modifyForm.singers" auto-complete="off" placeholder="请输入歌手专辑"></el-input>
    </el-form-item>

    <el-form-item label="发行年份:" :label-width="formLabelWidth" prop="albumYear">
      <el-select v-model="modifyForm.albumYear" placeholder="请选择发行年份" class="sexArea" multiple>
        <el-option label="2020" value="y2020"></el-option>
        <el-option label="2019" value="y2019"></el-option>
        <el-option label="2018-2000" value="y2018"></el-option>
        <el-option label="90年代" value="y90"></el-option>
        <el-option label="更早" value="other"></el-option>
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
export default {
  name: "list",
  data: function() {
    return {
      title: "hello world",
      paginationShow: true,
      collectFlag:false,
      collect:"收藏",
      albumName: "",
      albumYear: "",
      albumYears: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "2020",
          value: "y2020"
        },
        {
          label: "2019",
          value: "y2019"
        },
        {
          label: "2018-2000",
          value: "y2018"
        },
        {
          label: "90年代",
          value: "y90"
        },
        {
          label: "更早",
          value: "other"
        }
      ],
      location: "",
      locations: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "中国",
          value: "china"
        },
        {
          label: "海外",
          value: "abroad"
        }
      ],
      // 校验规则
      rules: {
        albumName: [
          { required: true, message: "请输入专辑名称", trigger: "blur" }
        ],
        age: [
          { required: true, message: "请输入专辑价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" }
        ],
        location: [
          { required: true, message: "请选择发行地区", trigger: "change" },
          { required: true, message: "请选择发行地区", trigger: "blur" }
        ],
        singers: [
          { required: true, message: "请输入歌手姓名", trigger: "blur" }
        ],
        albumYear: [
          {
            required: true,
            message: "至少选择一个发行年份",
            trigger: "change"
          },
          { required: true, message: "至少选择一个发行年份", trigger: "blur" }
        ],
      },
      currentPage: 1, //当前页数
      pageNumber: 1, //第几页
      pageRow: 3, //每页多少条
      length: 0, //共有多少条
      searchUrl: "./getAlbumList",
      addUrl: "./addAlbum",
      modifyUrl: "./modifyAlbum",
      deleteUrl: "./deleteAlbum",
      tableData: [],
      addFormVisible: false,
      modifyFormVisible: false,
      modifyId: "",

      addForm: {
        albumName: "",
        price: "",
        location: "",
        singers: "",
        albumYear: [],
      },
      modifyForm: {
        albumName: "",
        price: "",
        location: "",
        singers: "",
        albumYear: [],
      },
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    // 清除查询条件
    clear() {
      this.albumName = "";
      this.albumYear = "";
      this.location = "";
    },
 toggleCollect(){
   if(this.collectFlag){
    console.log("##############"+this.collectFlag);
    this.collect="取消收藏";
    }
  else
     this.collect="收藏";
   this.collectFlag=!this.collectFlag;

 },
    //查询
    search() {
      this.paginationShow = false;

      var searchParmas = {
        albumName: this.albumName,
        location: this.location,
        albumYear: this.albumYear,
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

    jungleLocation(location) {
      if (location == "china") {
        return "中国";
      } else if (location == "abroad") {
        return "海外";
      } else {
        return "";
      }
    },

    jungleYear(year) {
      var albumYearQuery = {
        y2020: "2020",
        y2019: "2019",
        y2018: "2018-2000",
        y90: "90年代",
        other: "其他"
      };

      var albumYearName = [];

      year.forEach(function(elem, index) {
        albumYearName.push(albumYearQuery[elem]);
      });

      return albumYearName.toString();
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
    deleteAlbum(id) {
      var that = this;
      var deleteId = id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
