import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupPage from "../views/SignupPage.vue";
import LoginPage from "../views/LoginPage.vue";
import PostsAll from "../views/PostsAll.vue";

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
    name: "PostsAll",
    component: PostsAll,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
