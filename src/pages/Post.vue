<template>
  <div class="post">
    <div v-html="post_html" v-highlight></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'PostCom',
  props: {
    post_url: String
  },
  mounted() {
    let title = this.$route.query.title
    let post_url = "https://raw.githubusercontent.com/liuyunplus/my-test/main/html/" + title + ".html"
    let vue = this
    axios.get(post_url).then(function (response) {
      vue.post_html = response.data
    })
  },
  data() {
    return {
      post_html: ""
    }
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/style/global";

</style>
