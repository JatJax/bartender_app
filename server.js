const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const connectionString = 'mongodb+srv://TJanth:alchohol@cluster0.mcfkl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('bartender-app');
  })

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.listen(3000, () =>{
    console.log('listening on 3000');
})

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.post('/quotes', (req,res) => {
  console.log(req.body);
})