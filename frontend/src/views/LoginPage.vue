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
              class="form-control"
              id="formUsername"
              v-model="username"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="formPwd"
              v-model="password"
            />
          </div>

          <button @click.prevent="submitLogin" class="btn btn-primary">
            Login
          </button>
          <!-- <button type="submit" class="btn btn-primary">Login</button> -->
          <div>Making changes</div>
        </form>
      </div>

      <!-- positioning right -->
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submitLogin() {
      console.log(`Email: ${this.username}`);
      console.log(`Password: ${this.password}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
