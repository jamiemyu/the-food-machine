const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static(__dirname));
app.get('/foo', (request, response) => {
   console.log(request.query);
   let url = 'http://food2fork.com/api/search?key=5b5db650cd471fa8a983a16c32b6ebb9' + '&q=' + request.query.q;
    fetch(url)
        .then(res => res.json())
        .then(json => response.send(json));
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => console.log('App running on port 3000'))
