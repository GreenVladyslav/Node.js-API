const express = require('express');
const {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost,
} = require('../controllers/api-post-controller');

const router = express.Router();

// Get All Posts
// получаем с базы данных посты
router.get('/api/posts', getPosts);

// Add New Post
// пост запрос добавляем данніе постим
router.post('/api/post', addPost);

// Get Post by ID
// получаем с базы данных по ид
router.get('/api/post/:id', getPost);

//Delete Post by ID
// удаляем с базы данных по ид
router.delete('/api/post/:id', deletePost);

//Update Post by Id
// страница с формой для редактирования и обновления и перехода к постам
router.put('/api/post/:id', editPost);

module.exports = router;
