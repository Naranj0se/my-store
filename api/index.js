const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hola mi server en express')
})

app.listen(port, () => {
  console.log('Mi port' + port);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
