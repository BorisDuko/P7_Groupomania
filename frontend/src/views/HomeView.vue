<template>
  <div class="home-container">
    <header class="header-register">
      <nav class="navbar navbar-light bg-light">
        <div class="login-signup-buttons">
          <router-link class="mr-sm-2 nav-link" to="/auth/login"
            >Login</router-link
          >
          <router-link class="mr-sm-2 nav-link" to="/auth/signup">
            Signup
          </router-link>
        </div>
      </nav>
    </header>
    <h1>{{ welcomeMessage }}</h1>
    <p>Nothing here yet - but you can click for some jokes</p>
    <!-- axios testing  -->
    <button @click="showJoke" class="btn btn-info joke" type="button">
      Show joke
    </button>
    <div v-if="joke">
      <p class="joke">{{ joke }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      joke: "",
      welcomeMessage: "Welcome to Groupomania home page",
    };
  },
  methods: {
    async showJoke() {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      const joke = await axios.get("https://icanhazdadjoke.com", config);
      this.joke = joke.data.joke;
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.home-container {
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.joke {
  margin-top: 16px;
}
.login-signup-buttons {
  position: absolute;
  top: -80px;
  left: 266px;
}
</style>
