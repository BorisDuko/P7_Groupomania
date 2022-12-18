<template>
  <div class="container">
    <div class="card">
      <div class="card-header">post ID: {{ post.p_id }}</div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">text here ---- {{ post.p_text }}</p>
        <a @click="goBack" class="btn btn-primary">Go back</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      p_id: "",
      post: "",
    };
  },

  // lifecycle
  async created() {
    const accessToken = localStorage.getItem("accessToken");
    // post ID need to be added TODO
    const config = {
      method: "get",
      url: "http://localhost:3000/posts/14",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios(config);
    console.log(response.data);
    this.post = response.data[0];
  },
  methods: {
    async goBack() {
      this.$router.push(`/posts`);
    },
  },
};
</script>

<style></style>
