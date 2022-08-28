<template>
  <div class="header">
    <div class="header-left">
      <router-link to="/home">我的博客</router-link>
    </div>
    <div class="header-right">
      <router-link to="/home">首页</router-link>
      <span style="width: 5px; display: inline-block"/>
      <router-link to="/category">分类</router-link>
      <span style="width: 5px; display: inline-block"/>
      <router-link to="/about">关于</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="less" scoped>
.header {
  width: 950px;
  height: 60px;
  background-color: #6699cc;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  .header-left {
    font-size: 26px;
  }

  .header-right {
    font-size: 18px;
    text-align: right;
  }

  a {
    color: black;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }

}
</style>
