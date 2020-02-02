<template>
  <div class="test">
     <div id="nav">
          <router-link to="/album">音乐专辑管理</router-link> |
          <router-link to="/singer">歌手管理</router-link> |
          <router-link to="/test">mocha测试</router-link> |
          <router-link to="/interface">接口测试</router-link>|
          <router-link to="/">登出</router-link> 
    </div>
    <pre>GET http://localhost:3000/album
Accept: application/json

###

POST http://localhost:3000/album
Content-Type: application/json

{
  "album_name": "my album",
  "price": 216
}

###

DELETE http://localhost:3000/album/5e1680416847d8312b777253
Accept: application/json

###</pre>
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