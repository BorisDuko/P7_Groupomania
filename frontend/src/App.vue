<template>
  <div>
    <header class="header-register">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Groupomania</a>
        <div id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto"></ul>
          <form class="form-inline my-2 my-lg-0">
            <router-link class="nav-link" to="/auth/login">Login</router-link>
            <router-link
              class="btn btn-outline-primary my-2 my-sm-0"
              to="/auth/signup"
            >
              Signup
            </router-link>
          </form>
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
// #app {

// }
</style>
