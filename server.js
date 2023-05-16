const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan'); // http loger middlware
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override'); //midlware Для PUT Это позволяет указать, какие методы ДОЛЖНЫ быть в запросе
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const errorMsg = chalk.bgKeyword('white').redBrightl;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log(successMsg('Connected to MongoDB')))
  .catch((err) => console.log(errorMsg(`DB connection error: ${err}`)));

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`listening port ${process.env.PORT}`));
});

//midlleware

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: false })); // midleware express
app.use(express.static('styles')); // добавляем стили к которім браузер может получить доступ
app.use(methodOverride('_method')); //это промежуточная функция, которая позволяет клиенту выполнять DELETE, PUT, PATCH или другие методы HTTP-запроса, используя скрытое поле формы с именем _method.

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

// Роуты
app.use(postRoutes); // с помощью метода или мидлвара use интегрируем данное мини приложение в основную логику сервера
app.use(contactRoutes);
app.use(postApiRoutes);

// редирект
app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

//  перехват ошибки
app.use((req, res) => {
  const title = 'Error-page';
  res.status(404).render(createPath('error'), { title });
});
