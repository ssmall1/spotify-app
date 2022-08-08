require('dotenv').config();
const express = require('express');
const querystring = require('query-string');
const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
  // res.send('Hello World!');
  const data = { 
    name: 'Schuler',
    isAwesome: true
  };

  res.json(data);
});

app.get('/login2', (req, res) => {
  // const state = generateRandomString
  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);

  // res.redirect(`https://accounts.spotify.com/authorize?
  //               client_id=${CLIENT_ID}&response_type=code
  //               &redirect_uri=${REDIRECT_URI}`)

});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`)
});