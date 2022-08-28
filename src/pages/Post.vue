<template>
  <div id="post">
    <h2>{{ post_title }}</h2>
    <div v-html="post_html" v-highlight></div>
  </div>
</template>

<script>
import axios from "axios";
import * as global from '../utils/global'

export default {
  name: 'Post',
  mounted() {
    this.post_title = this.$route.query.title
    let post_url = `https://raw.githubusercontent.com/liuyunplus/yun-blog-data/main/html/${this.post_title}.html`
    let vue = this
    axios.get(post_url).then(function (response) {
      vue.post_html = response.data
      //渲染数学公式
      vue.$nextTick().then(()=>{
        global.renderByMathjax(document.getElementById('post'))
      });
    })
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
