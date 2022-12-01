// const db = require("../config/database");

// class Post {
//   constructor(text) {
//     this.text = text;
//   }

//   async save() {
//     let d = new Date();
//     let yyyy = d.getFullYear();
//     let mm = d.getMonth() + 1;
//     let dd = d.getDate();

//     let createdAtDate = `${yyyy}-${mm}-${dd}`;

//     let sql = `
//     INSERT INTO post_table(
//         text,
//     )
//     VALUES(
//         "${this.text}",
//         "${createdAtDate}"
//     )
//     `;

//     const [newPost, _] = await db.execute(sql);

//     return newPost;
//   }

//   static findAll() {}
// }

// module.exports = Post;
/*
// instead creating instance of the class
// and do like this
const post = new Post();
p.findAll()

// static findAll() allow to do 
Post.findAll(); 
*/
