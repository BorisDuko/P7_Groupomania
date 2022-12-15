<template>
  <div class="container">
    <h1>Signup page</h1>
    <div class="row">
      <!-- positioning left -->
      <div class="col-md-3"></div>
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
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="formEmail"
              aria-describedby="emailHelp"
              v-model="email"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              class="form-control"
              id="formPassword"
              v-model="password"
              required
            />
          </div>
          <div
            v-if="password.length > 0 && password.length < 6"
            class="text-danger"
          >
            Password requirements: <br />
            >at least 6 characters long<br />
            >minimum 2 numbers <br />
            >include Uppercase <br />
            >NO spaces
          </div>

          <button @click.prevent="submitSignup" class="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
      <!-- positioning right -->
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "SignupPage",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    submitSignup() {
      console.log(`Username: ${this.username}`);
      console.log(`Email: ${this.email}`);
      console.log(`Password: ${this.password}`);
    },
  },
  shortPwd() {
    const pwd = this.password;
    if (pwd > 1 && pwd < 6) {
      return true;
    } else {
      return false;
    }
  },
};
</script>

<style lang="scss" scoped></style>
