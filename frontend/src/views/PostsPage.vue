<template>
  <div class="container">
    <h1>Posts Page</h1>
    <div v-if="errors" class="errors-container">{{ errors }}</div>
    <button @click="refreshPostsButton" type="button" class="btn btn-dark">
      Refresh
    </button>
    <button @click="logout" type="button" class="btn btn-light">Logout</button>
    <div
      v-for="post in posts"
      :key="post.p_id"
      class="card bg-light mb-3"
      style="max-width: 24rem"
    >
      <div class="card-header">
        Header p_id: {{ post.p_id }} | post date: {{ post.p_date_published }}
      </div>
      <div class="card-body">
        <h5 class="card-title">card title</h5>
        <p class="card-text">post.p_text: {{ post.p_text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostsPage",
  data() {
    return {
      posts: [],
      // p_id: "",
      // p_text: "",
      // p_date_published: "",
      // p_read_by_user: 0, // or false as default
      // r_user_id: "",
      errors: null,
    };
  },
  // lifecycle hook created
  async created() {
    const accessToken = localStorage.getItem("accessToken");
    // console.log("Access Token:", accessToken);
    // const userId = localStorage.getItem("userId");
    // console.log("User Id:", userId);
    const config = {
      method: "get",
      url: "http://localhost:3000/posts/",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios(config);
      // console.log(response);
      console.log(response.data);
      this.posts = response.data;
      // this.errors = "error msg"; // if err - will appear
      // console.log(posts);
    } catch (error) {
      console.log(error);
      this.errors = error; //  error handling
    }
  },
  methods: {
    async refreshPostsButton() {
      const accessToken = localStorage.getItem("accessToken");
      // console.log("Access Token:", accessToken);
      // const userId = localStorage.getItem("userId");
      // console.log("User Id:", userId);
      const config = {
        method: "get",
        url: "http://localhost:3000/posts/",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const response = await axios(config);
        // console.log(response);
        console.log(response.data);
        this.posts = response.data;
        // console.log(posts);
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
