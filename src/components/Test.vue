<template>
  <div class="test">
     <div id="nav">
          <router-link to="/album">音乐专辑管理</router-link> |
          <router-link to="/singer">歌手管理</router-link> |
          <router-link to="/test">mocha测试</router-link> |
          <router-link to="/interface">接口测试</router-link>|
          <router-link to="/">登出</router-link> 
    </div>
    <pre>   const mongoose=require('mongoose')
    require('../model')
    let album=require('../rounter/album');
    const assert=require('assert')

    describe("测试Album接口",function () {
        before(function () {
            mongoose.connect('mongodb://localhost/myDbs',function (err) {

        })
    })
        after(function () {
        mongoose.disconnect()
        })

    it("测试添一张专辑",function (done) {
        let album={name:'my first album',price: 200}
        album.add
    const mogoose=require('mongoose')

    let albumModel=mogoose.model("Album")

    function addAlbum(album,callback) {
        let b=  albumModel.create(album,function (err,newAlbumDoc) {
        if(!err) callback(newAlbumDoc.toObject())
        })
    }

    function getAlbumList(callback) {
        albumModel.find({}).exec(function (err,albums) {
            if(!err) callback(albums)
        })
    }

    function deleteAlbum(id,callback) {
        albumModel.findByIdAndRemove(id,function (err) {
        if(!err) callback({})
    })
    }

    module.exports={addAlbum,deleteAlbum,getAlbumList}
    (album,function (newablum) {
            assert.ok(newablum._id!=null)
            done()
        })
    })
    it('测试查询所有专辑',function (done) {
        album.getAlbumList(function (albums) {
           assert.ok(albums.length>0)
           albums.forEach(album=>console.log(album._id))
           done()
       })
    })
    it("测试删除",function (done) {
        album.deleteAlbum("5e3bb3ebc89e9c0e687e4d1c",function ({}) {
            console.log({})
            done()
        })
    })


})</pre>
  </div>
</template>
<style scoped>
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
</style>