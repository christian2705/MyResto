if (process.env.NODE_ENV !== 'production') {
  //memeriksa tahap nya tidak production
  require('dotenv').config();
}
//panggil diawal,cuman untuk tahap development

const express = require('express');
const router = require('./routes');
const app = express();

const port = process.env.port || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
