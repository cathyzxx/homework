<template lang="html">
  <div class="album">
      <header>
          <h1>欢迎访问音乐平台</h1>
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
        <el-button type="warning" @click="logout" class="login-btn" >退出</el-button>
      </header>
            <el-button type="success"  @click="getFavs">我的收藏夹：</el-button> {{favs}}
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
                <el-button type="danger" @click="toggleFav(scope.row.albumName)">{{getFavStatus(scope.row.albumName)}}</el-button>
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

  </div>
</template>

<script>
import request from "@/utils/request";
import { removeToken } from "@/utils/user"
export default {
  name: "album",
  data: function() {
    return {
      modifyUrl: "./modifyUser",
      favStatus:"",
      favs:[],
      fav:"",
      searchByUnameUrl: "./searchByUname",
      title: "hello world",
      paginationShow: true,
      albumName: "",
      singer: "",
      singers: [],
      currentPage: 1, //当前页数
      pageNumber: 1, //第几页
      pageRow: 3, //每页多少条
      length: 0, //共有多少条
      searchUrl: "./getAlbumList",searchSingerUrl:"./getSinger",
      tableData: [],
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    getFavStatus(albumName){
      const index = this.favs.indexOf(albumName);
     if (index === -1) {
       return "收藏专辑";
      } else  {
       return "取消收藏";
      }
    },
    //用户点击收藏转化按钮触发，先改变this.fav，再同步到数据库
toggleFav(albumName) {
  //查看当前点击专辑id是否在this.fav中，若在，则去掉;若不在，则添加
    const index = this.favs.indexOf(albumName);
     if (index === -1) {
       this.favs.push(albumName);
      } else  {
         this.favs.splice(index, 1);
      }
 
      // this.modifyForm = Object.assign({}, row);
     //this.modifyId = row["_id"];
       var user={};
       var that = this;
       user.fav=this.favs;
      request({
        url: `${this.modifyUrl}/${this.uname}`,
        method: "put",
        data: user
      })
      .then(response => {
          if (response.data.status == "success") {
            console.log("togglefav ok");
           that.search();
          } else {
           console.log("togglefav fail");
           that.search();
          }
        }).catch(error => {
          console.log(error);
        }); 
    },
    getFavs() {
      var user={};
      var searchParmas = {
        uname: this.uname,
      };
      request({
        url: this.searchByUnameUrl,
        method: "post",
        data: searchParmas
      })
        .then(response => {
          if (response.data.status == "success") {
            user = response.data.userList;
            this.favs=user.fav;
            console.log(response.data.userList);
          } else {
            this.$message({
              message: "查询出错，请重试!",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      sessionStorage.removeItem("queryParmas"); 
    },
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
            this.getFavs();
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
      that.$router.push({path:"/"});
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
  
  },

  mounted: function() {
    this.search();
    this.uname=this.$route.query.uname;
    console.log("mounted get"+this.uname);
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
