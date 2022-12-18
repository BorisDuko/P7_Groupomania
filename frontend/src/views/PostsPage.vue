<template>
  <div class="container">
    <!-- // single post button -->
    <button @click="getOnePost">getOnePost function</button>
    <h1>Posts Page</h1>
    <button @click="refreshPostsButton" type="button" class="btn btn-dark">
      Refresh
    </button>
    <div class="user-info">
      <h4>Hello {{ username }}</h4>
      <button @click="logout" type="button" class="btn btn-light logout">
        Logout
      </button>
    </div>
    <div class="posts-container">
      <div v-if="errors" class="errors-container">{{ errors }}</div>

      <div
        v-for="post in posts"
        :key="post.p_id"
        class="card bg-light mb-3"
        style="max-width: 24rem"
      >
        <div class="card-header">
          Post № {{ post.p_id }} by {{ post.u_username }} <br />
          @{{ post.p_date_published }}
        </div>
        <div class="card-body">
          <h5 class="card-title">card title</h5>
          <p class="card-text">(Post text): {{ post.p_text }}</p>

          <span
            @click="seeFullPost(post.p_id)"
            class="badge badge-pill badge-secondary"
            >...see more</span
          >
        </div>
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
      // p_id: "", // using it in getOnePost()
      // p_text: "",
      // p_date_published: "",
      // p_read_by_user: 0, // or false as default
      // r_user_id: "",
      errors: null,
      username: "", // greet user that logged in
    };
  },
  // lifecycle hook created
  async created() {
    const accessToken = localStorage.getItem("accessToken");
    this.username = localStorage.getItem("username"); // YAY!
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
    async getOnePost() {
      const accessToken = localStorage.getItem("accessToken");
      const postId = this.p_id;
      const config = {
        method: "get",
        url: `http://localhost:3000/posts/${postId}`,
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
    async seeFullPost(id) {
      console.log(id);
      this.$router.push(`/posts/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.posts-container {
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.badge {
  cursor: pointer;
}
.user-info {
  display: flex;
  position: absolute;
  top: 21px;
  right: 10px;
}
.logout {
  margin-left: 20px;
}
</style>
