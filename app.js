const http = require('http'); // Импорт встроенного модуля http
const fs = require('fs'); // Импорт встроенного модуля файловой системы
const path = require('path'); // Импорт встроенного модуля пути для работы с путями к файлам и каталогам

const PORT = 3000; // Определяем номер порта для прослушивания сервером

// Создание экземпляра сервера с помощью метода createServer модуля http
const server = http.createServer((req, res) => {
  console.log('Server request'); // Записываем сообщение в консоль всякий раз, когда сервер получает запрос
  console.log('Just for test');
  res.setHeader('Content-Type', 'text/html'); // Установка заголовка Content-Type ответа, чтобы указать, что тело ответа будет в формате JSON

  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

  let basePath = '';

  switch (req.url) {
    case '/': // множественные пути для одной страницы
    case '/home':
    case '/index.html':
      basePath = createPath('index');
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301; // контралируемый redirect
      res.setHeader('Location', '/contacts');
      res.end();
      break;
    case '/contacts':
      basePath = createPath('contacts');
      res.statusCode = 200;
      break;
    default:
      basePath = createPath('error');
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

// Запускаем сервер и прослушиваем указанный порт и имя хоста
server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
