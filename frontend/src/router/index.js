import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupPage from "../views/SignupPage.vue";
import LoginPage from "../views/LoginPage.vue";
import PostsPage from "../views/PostsPage.vue";
import PostOne from "../views/PostOne.vue";

const routes = [
  {
    path: "",
    redirect: "/auth/login", // redirect on startup to login page
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: SignupPage,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/posts",
    name: "Posts",
    component: PostsPage,
  },
  {
    path: "/posts/:p_id",
    name: "OnePost",
    component: PostOne,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
