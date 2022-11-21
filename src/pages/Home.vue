<template>
  <div v-for="year in postYears" class="post-group">
    <div class="post-year">{{ year }}</div>
    <div class="post-list">
      <div v-for="post in postMap[year]" class="post-item">
        <router-link :to="{name:'Post', query:{title: post.title}}">{{ post.title }}</router-link>
        <span>{{ this.getPostDate(post.date) }}</span>
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
  methods: {
    getPostDate(date) {
      let date_arr = date.split("-")
      return this.getEnglishMonth(date_arr[1]) + " " + date_arr[2]
    },
    getEnglishMonth(month) {
      switch (month) {
        case '01': return 'Jan'
        case '02': return 'Feb'
        case '03': return 'Mar'
        case '04': return 'Apr'
        case '05': return 'May'
        case '06': return 'Jun'
        case '07': return 'Jul'
        case '08': return 'Aug'
        case '09': return 'Sep'
        case '10': return 'Oct'
        case '11': return 'Nov'
        case '12': return 'Dec'
      }
    }
  },
  computed: {
    postYears() {
      return Object.keys(this.postMap).sort().reverse()
    }
  }
}
</script>

<style lang="less" scoped>
a {
  color: black;
}

.post-group:first-child {
  margin-top: 20px;
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
      border-bottom: 1px dashed rgb(125, 130, 138);
    }
  }
}

</style>