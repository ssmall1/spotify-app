require('dotenv').config();
const express = require('express');
const app = express();
const port = 8888;

/*
app.METHOD(PATH, HANDLER);
http request method ex. get, post, put, delete
url that directs to the url path on the server
handler callback function run every time user hits url
*/

/* req and res are standard but can call whatever you want 
- but they will be request and response in that order no matter

req. object is a callback object with information 
- req.body - values of info
- req.method - method on request
- req.params - object with params mapped to named route parameters
- req.query - object containing a property for each query string parameter in route
    -  http://localhost:8888/awesome-generator?name=Schuler&isAwesome=false
    - need to JSON.parse bc query parameters always come back as strings not booleans
*/
app.get('/', (req, res) => {
  // res.send('Hello World!');
  const data = { 
    name: 'Schuler',
    isAwesome: true
  };

  res.json(data);
});

app.get('/awesome-generator', (req, res) => {
  const { name, isAwesome } = req.query;
  res.send(`${name} is ${JSON.parse(isAwesome) ? 'really' : 'not'} awesome`);
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`)
});