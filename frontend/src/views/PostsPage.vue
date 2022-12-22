<template>
  <div class="container">
    <h1>Posts Page</h1>
    <button @click="refreshPostsButton" type="button" class="btn btn-dark">
      Refresh
    </button>
    <button @click="deleteAccount" class="btn btn-light delete-account-btn">
      Delete Account
    </button>
    <!-- form here  -->
    <div class="file-form-container">
      <form
        @submit.prevent="onSubmit"
        enctype="multipart/form-data"
        class="new-post-form"
      >
        <div class="form-group file-form">
          <textarea
            v-model="this.p_text"
            placeholder="Write a new post"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
          <!-- image input  -->
          <input
            @change="onSelect"
            type="file"
            ref="filePicker"
            name="imgFile"
            class="form-control-file"
          />
          <button
            :disabled="!this.chosenFile && !this.p_text"
            type="submit"
            class="btn btn-secondary new-post-btn"
          >
            Post it
          </button>
          <div class="submit-err-msg">
            <h5>{{ submitMessage }}</h5>
          </div>
        </div>
      </form>
    </div>
    <!-- form here  -->
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
      p_image_url: null, // if image
      userId: "", // to pass for new post creation
      isReadByUser: false,
      p_read_by_user: "",
      chosenFile: "", // for image posting
      file: "",
      submitMessage: "",
      p_author_id: "",
      images: null,
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
    // CHOSE IMAGE
    onSelect() {
      this.chosenFile = this.$refs.filePicker.files[0];
      console.log(this.chosenFile);
      const allowedTypes = [
        "image/jpeg",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(this.chosenFile.type)) {
        this.submitMessage = "Only images are required";
      }
    },
    // ADD NEW POST
    async onSubmit() {
      const accessToken = localStorage.getItem("accessToken");
      this.userId = localStorage.getItem("userId");
      const formData = new FormData();
      // append the image as a file
      formData.append("imgFile", this.chosenFile);
      // Create the dataset
      const data = {
        p_author_id: this.userId,
        p_text: this.p_text,
      };
      // append the dataset as json
      formData.append("otherFields", JSON.stringify(data));
      const config = {
        method: "post",
        url: "http://localhost:3000/posts",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };
      try {
        const res = await axios(config);
        console.log("response:", res);
        this.submitMessage = "Posted!!! 😊";
        // notify user posted successfully, update post page
        setTimeout(() => {
          this.refreshPostsButton();
          this.submitMessage = "";
        }, 1000);
      } catch (error) {
        console.log(error);
        this.submitMessage = "Something went wrong 💩";
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
  // margin-right: 0;
  margin-right: 499px;

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
