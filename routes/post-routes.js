const express = require('express');
const {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost,
} = require('../controllers/post-controller');

const router = express.Router();

// получаем с базы данных посты
router.get('/posts', getPosts);

// получаем с базы данных по ид
router.get('/posts/:id', getPost);

// удаляем с базы данных по ид
router.delete('/posts/:id', deletePost);

// страница с формой для редактирования
router.get('/edit/:id', getEditPost);

// страница с формой для редактирования и обновления и перехода к постам
router.put('/edit/:id', editPost);

// получаем форму где можно добавить пост
router.get('/add-post', getAddPost);

// пост запрос добавляем данніе постим
router.post('/add-post', addPost);

module.exports = router;
