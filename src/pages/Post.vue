<template>
  <div id="post">
    <div class="title">{{ post_title }}</div>
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

.title {
  font-size: 1.75em;
  text-align: center;
  margin-bottom: 0.4em;
}

figure {
  margin-inline-end: 0px;
  margin-inline-start: 0px;
}
</style>
