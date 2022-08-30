<template>
  <div v-for="year in getPostYears" class="post-group">
    <div class="post-year">{{ year }}</div>
    <div class="post-list">
      <div v-for="post in postMap[year]" class="post-item">
        <router-link :to="{name:'Post', query:{title: post.title}}">{{ post.title }}</router-link>
        <span>{{ post.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import postMap from '../assets/meta/PostMap.json';

export default {
  name: 'Home',
  mounted() {
    this.postMap = postMap
  },
  data() {
    return {
      postMap: {}
    }
  },
  computed: {
    getPostYears() {
      return Object.keys(this.postMap).sort().reverse()
    }
  }
}
</script>

<style lang="less" scoped>
a {
  color: #2c3e50;
}

.post-group {
  display: flex;
  margin-bottom: 20px;

  .post-year {
    width: 110px;
    text-align: left;
    font-size: 26px;
    padding-top: 6px;
  }

  .post-list {
    width: 100%;

    .post-item {
      display: flex;
      justify-content: space-between;
      height: 46px;
      line-height: 46px;
      border-bottom-width: 1px;
      border-bottom-style: dashed;
      border-bottom-color: rgb(125, 130, 138);
    }
  }
}

</style>