<template>
  <div class="container">
    <h1>Posts Page</h1>
    <button @click="refreshPostsButton" type="button" class="btn btn-dark">
      Refresh
    </button>
    <form>
      <div class="form-group">
        <textarea
          v-model="this.p_text"
          placeholder="Write new post"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <button
          @click="addNewPost"
          type="button"
          class="btn btn-secondary new-post-btn"
        >
          Post it
        </button>
      </div>
    </form>
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
          @{{ properDateFormat(post.p_date_published) }}
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
      // p_id: "", //
      // p_text: "",
      // p_date_published: "",
      // p_read_by_user: 0, // or false as default
      // r_user_id: "",
      errors: null,
      username: "", // greet user that logged in
      p_text: "",
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
    async addNewPost() {
      console.log(this.p_text);
      this.p_text = "";
      // const accessToken = localStorage.getItem("accessToken");
      // const config = {
      //   method: "post",
      //   url: "http://localhost:3000/posts",
      //   data: {
      //     p_author_id: "",
      //     p_text: "",
      //   },
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // };
      // try {
      //   const response = await axios(config);
      //   // console.log(response);
      //   console.log(response.data);
      //   this.posts = response.data;
      //   // console.log(posts);
      // } catch (error) {
      //   console.log(error);
      // }
    },
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

    async seeFullPost(id) {
      console.log(id);
      this.$router.push(`/posts/${id}`);
    },
    properDateFormat(date) {
      return date.split(".")[0].split("T").reverse().join(" ");
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
form {
  margin-top: 16px;
}
.new-post-btn {
  display: block;
  margin-left: auto;
  margin-right: 0;
  margin-top: 16px;
}
</style>
