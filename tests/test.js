// import { test, describe } from "node:test";
// import assert from "node:assert";
// import listHelper from "../utils/list_helper.js";

// test("dummy returns one", () => {
//   const blogs = [];

//   const result = listHelper.dummy(blogs);
//   assert.strictEqual(result, 1);
// });

// describe("total likes", () => {
//   test("when the list is empty, returns 0", () => {
//     const blogs = [];
//     const result = listHelper.totalLikes(blogs);
//     assert.strictEqual(result, 0);
//   });

//   test("when the list has only one blog, equals the likes of that blog", () => {
//     const blogs = [
//       {
//         title: "React patterns",
//         author: "Micheal Chan",
//         url: "https://reactpatterns.com/",
//         likes: 7,
//       },
//     ];
//     const result = listHelper.totalLikes(blogs);
//     assert.strictEqual(result, 7);
//   });

//   test("when the list has multiple blogs, calculates the total likes correctly", () => {
//     const blogs = [
//       {
//         title: "React patterns",
//         author: "Michael Chan",
//         url: "https://reactpatterns.com/",
//         likes: 7,
//       },

//       {
//         title: "Go To Statement Considered Harmful",
//         author: "Edsger W. Dijkstra",
//         url: "http://example.com/",
//         likes: 5,
//       },

//       {
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         url: "http://example.com/",
//         likes: 12,
//       },
//     ];

//     const result = listHelper.totalLikes(blogs);
//     assert.strictEqual(result, 24);
//   });
// });

// describe("favorite blog", () => {
//   test("when the list is empty, returns null", () => {
//     const blogs = [];
//     const result = listHelper.favoriteBlog(blogs);
//     assert.deepStrictEqual(result, null);
//   });

//   test("when the list has only one blog, it is the favorite", () => {
//     const blogs = [
//       {
//         title: "React patterns",
//         author: "Michael Chan",
//         url: "https://reactpatterns.com/",
//         likes: 7,
//       },
//     ];
//     const result = listHelper.favoriteBlog(blogs);
//     assert.deepStrictEqual(result, {
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//     });
//   });

//   test('when the list has multiple blogs, returns the one with the most likes', () => {
//     const blogs = [
//         {
//             title: "React patterns",
//             author: "Michael Chan",
//             url: "https://reactpatterns.com/",
//             likes: 7,
//           },
//           {
//             title: "Go To Statement Considered Harmful",
//             author: "Edsger W. Dijkstra",
//             url: "http://example.com/",
//             likes: 5,
//           },
//           {
//             title: "Canonical string reduction",
//             author: "Edsger W. Dijkstra",
//             url: "http://example.com/",
//             likes: 12,
//           },
//     ]
//     const result = listHelper.favoriteBlog(blogs)
//     assert.deepStrictEqual(result, {
//         title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://example.com/",
//       likes: 12,
//     }
//     )
//   })

//   test('when multiple blogs have the same highest likes, returns one of them', () => {
//     const blogs = [
//         {
//             title: "React patterns",
//             author: "Michael Chan",
//             url: "https://reactpatterns.com/",
//             likes: 12,
//           },
//           {
//             title: "Go To Statement Considered Harmful",
//             author: "Edsger W. Dijkstra",
//             url: "http://example.com/",
//             likes: 12,
//           },
//     ]
//     const result = listHelper.favoriteBlog(blogs)
//     assert.ok(result.likes === 12 && 
//         (result.title === 'React patterns' || result.title === 'Go To Statement Considered Harmful')
//     )
//   })
// });
