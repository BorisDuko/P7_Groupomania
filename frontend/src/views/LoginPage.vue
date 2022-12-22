<template>
  <div class="container">
    <h1>Welcome. Please Login</h1>
    <div class="row">
      <!-- positioning left -->
      <div class="col-md-3"></div>

      <!-- center form  -->
      <div class="col-md-6">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input
              type="text"
              name="username"
              class="form-control"
              id="formUsername"
              v-model="username"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              class="form-control"
              id="formPwd"
              v-model="password"
            />
          </div>
          <div class="login-buttons">
            <button
              @click.prevent="submitLogin"
              type="submit"
              class="btn btn-primary"
            >
              Login
            </button>
            <router-link
              class="btn btn-outline-primary my-2 my-sm-0"
              to="/auth/signup"
            >
              Signup
            </router-link>
          </div>
        </form>
      </div>

      <!-- positioning right -->
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "new_user1", // to delete after values
      password: "pwd123",
    };
  },
  // mounted: function () {
  //   this.$router.replace("/posts");
  // },

  methods: {
    async submitLogin() {
      console.log(`Username: ${this.username}`);
      console.log(`Password: ${this.password}`);

      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          u_username: this.username,
          u_pwd: this.password,
        });
        console.log(response.data);
        // const resStatus = response.request.status; // 200/
        // if login successful
        if (response.data === "Password incorrect") {
          alert("Password incorrect");
          return;
        }
        // ------------------
        // getting token & userId
        const token = response.data.token;
        const userId = response.data.userId;
        // push values to local storage
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", this.username);
        // ------------------

        this.$router.push("/posts"); // redirect to allPosts page
      } catch (error) {
        if (error) {
          alert("Wrong Username");
        }
        console.log("authError");
        console.error(error.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-outline-primary {
  margin-left: 20px;
}
</style>
