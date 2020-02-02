<template>
  <div id="app">
   <h1>欢迎来到音乐管理平台</h1>
      <div id="logout">
      <router-link to="/">登出</router-link> 
    </div>
    <router-view/>
    <div id="nav">
      <router-link to="/album">专辑管理</router-link>|
      <router-link to="/singer">歌手管理</router-link>|
      <router-link to="/test">mocha测试</router-link>|
      <router-link to="/api">接口测试</router-link>|
    </div>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/homeBg.jpg");
  background-repeat:no-repeat;
  background-size: cover;
  position: fixed;
}

#nav {
  margin-top: 360px;
  margin-left: 70px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 30px;
  margin-left: 30px;
  margin-right: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
