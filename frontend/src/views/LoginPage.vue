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

          <button @click.prevent="submitLogin" class="btn btn-primary">
            Login
          </button>
          <!-- <button type="submit" class="btn btn-primary">Login</button> -->
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
  //   this.$router.replace("PostsAll");
  // },
  /**
   * to try redirect/ instead of push - replace
    //  const userId = data.userId.value
    // we can manually build the url but we will have to handle the encoding ourselves
    router.push(`/user/${username}`) // -> /user/eduardo
    // same as
    router.push({ path: `/user/${username}` }) // -> /user/eduardo
    // if possible use `name` and `params` to benefit from automatic URL encoding
    router.push({ name: 'user', params: { username } }) // -> /user/eduardo
    // `params` cannot be used alongside `path`
    router.push({ path: '/user', params: { username } }) // -> /user
   */
  methods: {
    async submitLogin() {
      console.log(`Email: ${this.username}`);
      console.log(`Password: ${this.password}`);

      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          u_username: this.username,
          u_pwd: this.password,
        });
        console.log(response);
        const resStatus = response.request.status; // 200
        console.log(resStatus);
        // if login successful
        if (resStatus === 200) {
          // this.$router.replace("PostsAll"); // redirect to allPosts page
          const userId = response.data.userId;
          console.log("UserId:", userId);
        }
      } catch (error) {
        console.log("authError");
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
