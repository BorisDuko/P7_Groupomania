<template>
  <div class="container">
    <h1>Posts Page</h1>
    <button @click="refreshPostsButton" type="button" class="btn btn-dark">
      Refresh
    </button>
    <button @click="deleteAccount" class="btn btn-light delete-account-btn">
      Delete Account
    </button>
    <form enctype="multipart/form-data" class="new-post-form">
      <div class="form-group">
        <!-- image input  -->
        <!-- <input type="file" /> -->
        <!-- image input  -->
        <textarea
          v-model="this.p_text"
          placeholder="Write new post"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <input type="file" class="form-control-file" />
        <!-- @click="addNewPost" --for the button ⤵ -->
        <button
          @click="addNewPost"
          type="submit"
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
          <div>
            <p>
              Post № {{ post.p_id }} by {{ post.u_username }} <br />@{{
                properDateFormat(post.p_date_published)
              }}
            </p>
            <p></p>
          </div>
          <div>
            <span class="post-read" v-if="post.p_readby_user">✔(read)</span>
          </div>
        </div>
        <div class="card-body">
          <p class="card-text">{{ post.p_text }}</p>

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
      errors: null,
      username: "", // greet user that logged in
      p_text: "",
      p_image_url: "", // if image
      userId: "", // to pass for new post creation
      isReadByUser: false,
      p_read_by_user: "",
      // p_id: "", //
      // p_text: "",
      // p_date_published: "",
      // p_read_by_user: 0, // or false as default
      // r_user_id: "",
    };
  },
  // lifecycle hook created
  async created() {
    this.username = localStorage.getItem("username"); // YAY!
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
      // this.errors = "error msg"; // if err - will appear #TODO change name to errorMessages
      // console.log(posts);
    } catch (error) {
      console.log(error);
      this.errors = error; //  error handling
    }
  },
  methods: {
    // ADD NEW POST
    async addNewPost() {
      this.userId = localStorage.getItem("userId");
      console.log(this.userId);
      console.log(this.p_text);

      const accessToken = localStorage.getItem("accessToken");
      const config = {
        method: "post",
        url: "http://localhost:3000/posts",
        data: {
          p_author_id: this.userId,
          p_text: this.p_text,
          p_image_url: this.p_image_url,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        await axios(config);
        // console.log(response.data);
        // to reset input form to blank
        this.p_text = "";
        // refresh page to update with post
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    // REFRESH BUTTON
    async refreshPostsButton() {
      const accessToken = localStorage.getItem("accessToken");
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
    // LOGOUT BUTTON
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    // DELETE ACCOUNT BUTTON
    async deleteAccount() {
      if (
        confirm(
          "❗❗❗ Do you want to delete the account❓❓❓ \n OK - Continue \n Cancel - Return "
        )
      ) {
        const userId = localStorage.getItem("userId");
        console.log(userId);
        console.log("acc to delete logic");
        await axios.delete(`http://localhost:3000/auth/delete/${userId}`);
        localStorage.clear();
        this.$router.replace("/");
      } else {
        console.log("acc didn't get deleted");
      }
    },
    // OPEN ONE POST PAGE
    async seeFullPost(id) {
      console.log(id);
      this.$router.push(`/posts/${id}`);
    },
    // IF POST READ BY USER (conditional rendering)
    doRead() {
      this.isReadByUser = this.p_read_by_user;
    },
    properDateFormat(date) {
      return date.split(".")[0].split("T").reverse().join(" ");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
}
.posts-container {
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
div.card {
  width: 350px;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
p.card-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // max-width: 200px;
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
textarea.form-control {
  height: 45px;
}
.delete-account-btn {
  position: absolute;
  top: 70px;
  right: 0px;
}
</style>
