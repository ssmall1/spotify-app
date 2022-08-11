require('dotenv').config();
const express = require('express');
const axios = require('axios');
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
  const code = req.query.code || null;

  // https://github.com/axios/axios#request-config
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`
    }
  })
    .then((response) => {
      if (response.status === 200) {
        // axios.get('https://api.spotify.com/v1/me', {
        //   headers: {
        //     Authorization: `${token_type} ${access_token}`
        //   }
        // })
        // .then(response => {
        //   res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
        // })
        // .catch(error => {
        //   res.send(error);
        // });

        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token, 
          refresh_token,
          expires_in,
        });

        res.redirect(`http://localhost:3001/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
      }
    })
    .catch((error) => {
      res.send(error)
    });
});

// REFRESH TOKEN
app.get('/refresh_token', (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`)
});