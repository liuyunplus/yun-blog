<template>
  <div v-for="post in postList" :key="post.id">
    <span>{{ post.create_time }}</span>
    <span style="width: 10px; display: inline-block"/>
    <router-link :to="{name:'Post', query:{title: post.post_title}}">{{ post.post_title }}</router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomeCom',
  mounted() {
    let vue = this
    axios.get('https://6309e32a32499100327d2bfb.mockapi.io/post').then(function (response) {
      vue.postList = response.data
      vue.$store.commit("setPostList", response.data);
    })
  },
  data() {
    return {
      postList: []
    }
  }
}
</script>

<style scoped>

</style>