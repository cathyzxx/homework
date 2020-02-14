const express = require("express");
const router = express.Router();
const Album = require("../models/albumSchema");
const Singer = require("../models/singerSchema");
const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
//check if register uname is duplicate
router.post("/checkUname", (req, res) => {
  var sqlObj = {};
  sqlObj.uname = req.body.uname;
  var userList = User.find(sqlObj);
  userList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            info: '用户名错误'
          });
        }else{
            User.find(sqlObj,function(err,users){
            if(users.length==0){
              return res.send({
                status: "success",
              });
            }else{
              res.send({
              status:"fail",
              info: '用户名已被注册，请更换用户名'
              });
            }
          })
        }
    })
});
//check if album uname is duplicate
router.post("/checkAlbumName", (req, res) => {
  var sqlObj = {};
  sqlObj.albumName = req.body.albumName;
  var albumList = Album.find(sqlObj);
  albumList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            info: '专辑名错误'
          });
        }else{
          Album.find(sqlObj,function(err,albums){
            if(albums.length==0){
              return res.send({
                status: "success",
              });
            }else{
              res.send({
              status:"fail",
              info: '同名专辑已录入系统，请更换专辑名'
              });
            }
          })
        }
    })
});
//register API
router.post("/register", (req, res) => {
  console.log(req)
  User.create(req.body, (err, user) => {
    if (err) {
      res.json({
        status:"fail",
        error:err
      });
    } else {
      res.json({
        status:"success",
        message:"注册成功"
      });
    }
  });
  console.log(req.body)
});
//modifyUser API
router.put("/modifyUser/:uname", (req, res) => {
  User.findOneAndUpdate(
    { uname: req.params.uname },
    {
      $set: {
        fav: req.body.fav,
      }
    },
    {
      new: true
    }
  )
    .then(user => res.json({
      status:"success",
      message:"修改成功"
    }))
    .catch(err => res.json({
      status:"fail",
      error:"修改失败"
    }));
});
//search user by uname
router.post("/searchByUname", (req, res) => {
  var sqlObj = {};
  sqlObj.uname = req.body.uname;
  var userList = User.find(sqlObj);
  userList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            info: '查找收藏失败'
          });
        }else{
            User.find(sqlObj,function(err,users){
            if(users.length>0){
              return res.json({
                status: "success",
                info:"查找成功",
                userList:result[0],
              });
            }else{
              res.send({
              status:"fail",
              info: '查找失败'
              });
            }
          })
        }
    })
});

//user login
router.post("/login", (req, res) => {
  var sqlObj = {};
  sqlObj.uname = req.body.uname;
  sqlObj.pwd = req.body.pwd;
  var userList = User.find(sqlObj);
  userList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            info: '账号或密码错误'
          });
        }else{
            User.find(sqlObj,function(err,users){
            if(users.length>0){
              res.cookie('user',req.body.username);
              return res.send({
                status: "success",
                info:"欢迎来到郑晓霞音乐平台",
              });
            }else{
              res.send({
              status:"fail",
              info: '账号或密码错误'
              });
            }
          })
        }
    })
});

//admin login
router.post("/adminLogin", (req, res) => {
  var sqlObj = {};
  sqlObj.uname = req.body.uname;
  sqlObj.pwd = req.body.pwd;
  var userList = Admin.find(sqlObj);
  userList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            info: '账号或密码错误'
          });
        }else{
            Admin.find(sqlObj,function(err,admins){
            if(admins.length>0){
              res.cookie('user',req.body.username);
              return res.send({
                status: "success",
                info:"欢迎来到郑晓霞音乐平台",
              });
            }else{
              res.send({
              status:"fail",
              info: '账号或密码错误'
              });
            }
          })
        }
    })
});

//singer API
router.post("/getSinger", (req, res) => {
  var singerList = Singer.find({});
    singerList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            error:err
          });
        }else{
          Singer.find({},function(err,singers){
            res.json({
              status:"success",
              singerList:result,
              total:singers.length
            });
          })
        }
    })
});

router.post("/getSingerList", (req, res) => {
  var singerPosition = new RegExp(req.body.singerPosition),
      singerSex = req.body.singerSex,
      singerName = req.body.singerName,
      pageNumber = req.body.pageNumber,
      pageRow = req.body.pageRow;


  var sqlObj = {};

  if(singerPosition){
    sqlObj.singerPosition = singerPosition;
  }
  if(singerSex){
    sqlObj.singerSex = singerSex;
  }
  if(singerName){
    sqlObj.singerName = singerName;
  }

  
  var singerList = Singer.find(sqlObj);
      singerList.skip((pageNumber - 1)*pageRow);
      singerList.limit(pageRow)

    singerList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            error:err
          });
        }else{
          Singer.find(sqlObj,function(err,singers){
            res.json({
              status:"success",
              singerList:result,
              total:singers.length
            });
          })
        }
    })
});

router.get("/getSingerDetail/:id", (req, res) => {
  Singer.findById(req.params.id)
    .then(singer => {
      res.json(singer);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/addSinger", (req, res) => {
  console.log(req)
  Singer.create(req.body, (err, singer) => {
    if (err) {
      res.json({
        status:"fail",
        error:err
      });
    } else {
      res.json({
        status:"success",
        message:"新增成功"
      });
    }
  });

  console.log(req.body)
});

router.put("/modifySinger/:id", (req, res) => {
  console.log(req.params)
  Singer.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        singerName: req.body.singerName,
        age: req.body.age,
        singerSex: req.body.singerSex,
        album: req.body.album,
        singerPosition: req.body.singerPosition,
      }
    },
    {
      new: true
    }
  )
    .then(singer => res.json({
      status:"success",
      message:"修改成功"
    }))
    .catch(err => res.json({
      status:"fail",
      error:"修改失败"
    }));
});

router.delete("/deleteSinger/:id", (req, res) => {
  Singer.findOneAndRemove({
    _id: req.params.id
  })
    .then(singer => res.json({
      status:"success",
      message:"删除成功"
    }))
    .catch(err => res.json({
      status:"fail",
      message:"删除失败"
    }));
});


//album api
router.post("/getAlbumList", (req, res) => {
  var singer = new RegExp(req.body.singer),
      albumName = req.body.albumName,
      pageNumber = req.body.pageNumber,
      pageRow = req.body.pageRow;

  var sqlObj = {};
  if(singer){
    sqlObj.singer = singer;
  }
  if(albumName){
    sqlObj.albumName = albumName;
  }

  
  var albumList = Album.find(sqlObj);
      albumList.skip((pageNumber - 1)*pageRow);
      albumList.limit(pageRow)

    albumList.exec(function(err,result){
        if(err){
          res.json({
            status:"fail",
            error:err
          });
        }else{
          Album.find(sqlObj,function(err,albums){
            res.json({
              status:"success",
              albumList:result,
              total:albums.length
            });
          })
        }
    })
});

router.get("/getAlbumDetail/:id", (req, res) => {
  Album.findById(req.params.id)
    .then(album => {
      res.json(album);
    })
    .catch(err => {
      res.json(err);
    });
});


router.post("/addAlbum", (req, res) => {
  console.log(req)
  Album.create(req.body, (err, album) => {
    if (err) {
      res.json({
        status:"fail",
        error:err
      });
    } else {
      res.json({
        status:"success",
        message:"新增成功"
      });
    }
  });

  console.log(req.body)
});

router.put("/modifyAlbum/:id", (req, res) => {
  console.log(req.params)
  Album.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        albumName: req.body.albumName,
        price: req.body.price,
        singer: req.body.singer,
        albumYear:req.body.albumYear,
      }
    },
    {
      new: true
    }
  )
    .then(album => res.json({
      status:"success",
      message:"修改成功"
    }))
    .catch(err => res.json({
      status:"fail",
      error:"修改失败"
    }));
});


router.delete("/deleteAlbum/:id", (req, res) => {
  Album.findOneAndRemove({
    _id: req.params.id
  })
    .then(album => res.json({
      status:"success",
      message:"删除成功"
    }))
    .catch(err => res.json({
      status:"fail",
      message:"删除失败"
    }));
});

module.exports = router;




















