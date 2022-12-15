<template>
  <div class="home">
    <h1>{{ welcomeMsg }}</h1>
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
      welcomeMsg: "Welcome to Groupomania home page",
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
.home {
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.joke {
  margin-top: 16px;
}
</style>
