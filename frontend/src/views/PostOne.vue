<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        post ID: {{ post.p_id }} by {{ post.u_username }} <br />
        @:{{ post.p_date_published }}
      </div>
      <div class="card-body">
        <h5 class="card-title">title (if needed)</h5>
        <p class="card-text">
          text here ⤵ <br />
          {{ post.p_text }}
        </p>
        <div v-if="post.p_image_url" class="image-div">
          <p>Here will be image if there is one: {{ post.p_image_url }}</p>
        </div>
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
    const postId = this.$route.params.id;

    const config = {
      method: "get",
      url: `http://localhost:3000/posts/${postId}`,
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
