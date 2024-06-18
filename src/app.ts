import express from 'express';
// const express = require('express');

// import cors from 'cors';
// import bodyParser from 'body-parser';

const app = express();

const port = 4000;

// Enable credentials for using cookies
// app.use(cors({}));

// parses JSON data and makes it available in the req.body
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
