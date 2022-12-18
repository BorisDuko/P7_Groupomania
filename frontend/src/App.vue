<template>
  <div>
    <header class="header-register">
      <nav class="navbar navbar-light bg-light">
        <div class="logo-brand">
          <router-link class="nav-link" to="/home">
            <img
              src="./assets/groupomania_logo.png"
              width="30"
              height="30"
              alt="brand logo"
            />
            <span class="navbar-brand mb-0 h1">Groupomania</span>
          </router-link>
        </div>
      </nav>
      <br />
    </header>
    <router-view />
  </div>
</template>

<script>
// import PostsAll from "./components/PostsAll.vue";
export default {
  name: "App",
  component: {
    // PostsAll,
  },
};
</script>

<style lang="scss">
.login-signup-buttons {
  display: flex;
  align-items: center;
}
// #app {
// }
</style>
