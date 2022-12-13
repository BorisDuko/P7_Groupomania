<template>
  <div>
    <header class="header-register">
      <nav class="navbar navbar-light bg-light">
        <div class="logo-brand">
          <img
            src="./assets/groupomania_logo.png"
            width="30"
            height="30"
            alt=""
          />
          <span class="navbar-brand mb-0 h1">Groupomania</span>
        </div>
        <div class="login-signup-buttons">
          <router-link class="mr-sm-2 nav-link" to="/auth/login"
            >Login</router-link
          >
          <router-link
            class="btn btn-outline-primary my-2 my-sm-0"
            to="/auth/signup"
          >
            Signup
          </router-link>
        </div>
      </nav>
      <br />
      <!-- <nav>
        <router-link class="nav-link" to="/auth/login">Login</router-link>
        <router-link class="nav-link" to="/auth/signup">Signup</router-link>
      </nav> -->
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
.login-signup-buttons {
  display: flex;
}
// #app {
// }
</style>
