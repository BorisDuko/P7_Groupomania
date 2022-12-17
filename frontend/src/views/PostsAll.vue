<template>
  <div class="posts">
    <h1>All Posts Page</h1>
    <!-- <button @click="getAllPosts">show me posts</button>
    <div>
      <p>{{ allPosts }}</p>
    </div> -->
    <p>{{ msg }}</p>
    <button type="button" @click="alert('hi')">say hi</button>
    <br />
    <button @click="hello">?</button>

    <!-- <div v-for="(post in posts)">
      <p class="read" v-if="(post.p_read)">{{ post }}</p>
      <p class="not-read" v-else>{{ post }}</p>
    </div>-->

    <!-- <div
      v-for="post in posts"
      :key="post.p_id"
      class="card bg-light mb-3"
      style="max-width: 24rem"
    >
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Light card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div> -->
    <!-- posts div  -->
    <!-- <div v-for="post in posts" :key="post.p_id">
      <h3>Posts</h3>
      <h3>{{ post.p_text }}</h3>
    </div> -->
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "PostsAll",
  data() {
    return {
      msg: "this message came from return {}",
      // posts: [
      //   {
      //     p_id: 1,
      //     p_author_id: 1,
      //     p_text: "Post number 1 written by user number 1 aka user_aaa",
      //     p_image_url: "",
      //     p_date_published: "2022-11-27 15:55:20",
      //     read_by_user: false,
      //   },
      //   {
      //     p_id: 2,
      //     p_author_id: 2,
      //     p_text: "Post number 2 written by user number 2 aka user_bbb",
      //     p_image_url: "",
      //     p_date_published: "2022-11-28 16:55:20",
      //     read_by_user: false,
      //   },
      //   {
      //     p_id: 3,
      //     p_author_id: 3,
      //     p_text: "Post number 3 written by user number 3 aka user_ccc",
      //     p_image_url: "",
      //     p_date_published: "2022-11-29 17:55:20",
      //     read_by_user: false,
      //   },
      // ],

      methods: {
        hello() {
          console.log("hi");
        },
        sayHi() {
          alert("Hi!");
          console.log("Hi!");
        },
        async getAllPosts() {
          try {
            // const response = await axios.get("http://localhost:3000/posts");
            // console.log(response);
            alert("hey");
          } catch (error) {
            console.log(error);
          }
        },
        // async isRead() {
        //   // const posts = await axios.get();
        // },
      },
    };
  },
};

// post {
//   p_id: number,
//   p_text: string,
//   p_date_published: dateTime,
//   p_read: boolean
// },
</script>

<style lang="scss" scoped>
.read {
  color: green;
}
.not-read {
  color: red;
}
</style>
