<template>
  <div id="post">
    <h2>{{ post_title }}</h2>
    <div v-html="post_html" v-highlight></div>
  </div>
</template>

<script>
import * as global from '../utils/global'

export default {
  name: 'Post',
  mounted() {
    this.post_title = this.$route.query.title
    this.post_html = require(`../assets/html/${this.post_title}.html`).default
    //渲染数学公式
    this.$nextTick().then(()=>{
      console.log("开始渲染")
      global.renderByMathjax(document.getElementById('post'))
    });
  },
  data() {
    return {
      post_title: "",
      post_html: ""
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/style/global";

code {
  font-size: 16px;
}

figure {
  margin-inline-end: 0px;
  margin-inline-start: 0px;
}

h2 {
  text-align: center;
}
</style>
