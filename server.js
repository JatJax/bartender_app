const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const connectionString = 'mongodb+srv://TJanth:alchohol@cluster0.mcfkl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('bartender-app');
    const drinksCollection = db.collection('drinks');

    app.set('view engine', 'ejs');

    // Uses
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    // Listening
    app.listen(3000, () =>{
        console.log('listening on 3000');
    })
    // Getting
    app.get('/', (req, res) =>{
        const curser = db.collection('drinks').find().toArray()
          .then(results =>{
            res.render('index.ejs', {drinks: results})
          })
          .catch(error => console.error(error))
    })
    // Posting
    app.post('/drinks', (req,res) => {
      drinksCollection.insertOne(req.body)
        .then(result =>{
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    app.put('/drinks', (req, res) => {
      console.log(req.body);
  })
  })
  .catch(console.error);
    

