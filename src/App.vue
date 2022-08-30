<template>
  <Header></Header>
  <div class="main">
    <router-view></router-view>
  </div>
  <Footer></Footer>
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
@import "assets/style/global";
@import "assets/font/font";

#app {
  width: 950px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
