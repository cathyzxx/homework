
const express = require("express");
const router = express.Router();
const Album = require("../models/albumSchema");
const Singer = require("../models/singerSchema");

//login API
router.post('/login', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  if(username === 'zhengxiaoxia' && password === '123456'){
      res.cookie('user',username);
      return res.send({
          status: "success",
          info:"欢迎来到郑晓霞音乐平台"
      });
  }

  return res.send({
      status: "fail",
      info: '账号或密码错误'
  });
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
      location = req.body.location,
      albumName = req.body.albumName,
      pageNumber = req.body.pageNumber,
      pageRow = req.body.pageRow;

  var sqlObj = {};
  if(singer){
    sqlObj.singer = singer;
  }
  if(location){
    sqlObj.location = location;
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
        location:req.body.location,
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




















