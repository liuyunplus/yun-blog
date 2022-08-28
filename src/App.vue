<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  created() {
    let postList = this.$store.state.postList;
    if (postList == null) {
      let vue = this
      axios.get('https://6309e32a32499100327d2bfb.mockapi.io/post').then(function (response) {
        vue.$store.commit("setPostList", response.data)
      })
    }
  }
}
</script>

<style lang="less">
@import "assets/style/global.less";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 950px;
  margin: 0 auto;
}
</style>
