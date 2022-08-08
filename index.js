require('dotenv').config();
const express = require('express');
const { restart } = require('nodemon');
const querystring = require('query-string');
const app = express();
const port = 8888;

// UTILS
const { generateRandomString } = require('./utils/generateRandomString');

// ENV VARIABLES
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const stateKey = 'spotify_auth_state';

// HOME
app.get('/', (req, res) => {
  // res.send('Hello World!');
  const data = { 
    name: 'Schuler',
    isAwesome: true
  };

  res.json(data);
});

// LOGIN
app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  
  const scope = 'user-read-private user-read-email';

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);

  // res.redirect(`https://accounts.spotify.com/authorize?
  //               client_id=${CLIENT_ID}&response_type=code
  //               &redirect_uri=${REDIRECT_URI}`)

});

// CALLBACK
app.get('/callback', (req, res) => {
  res.send('Callback')
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`)
});