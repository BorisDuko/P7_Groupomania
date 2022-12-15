<template>
  <div class="dashboard">
    <h1>All Posts Page</h1>
    <!-- <div v-for="(post in postList)">
      <p class="read" v-if="(post.p_read)">{{ post }}</p>
      <p class="not-read" v-else>{{ post }}</p>
    </div>-->
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      methods: {
        async isRead() {
          // const postList = await axios.get();
        },
      },
    };
  },
};

// post {
//   p_id: number,
//   p_text: string,
//   p_date_published: dateTime,
//   p_read: boolean
// },
</script>

<style>
.read {
  color: green;
}
.not-read {
  color: red;
}
</style>
