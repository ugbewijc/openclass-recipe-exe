const express = require('express');
// const mongo = require('mongodb');
const bodyParser = require('body-parser');
// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const DbSchema = require('./models/thing');

const app = express();
// const db = mongoose.connect('mongodb+srv://recipe-exercise:<gb3rjsP2CtMqhBvA>@devjohnugbewi-rqyzn.mongodb.net/test?retryWrites=true&w=majority');
const apiRouter = express.Router();

const uri = 'mongodb+srv://recipe-exercise:gb3rjsP2CtMqhBvA@devjohnugbewi-rqyzn.mongodb.net/test?retryWrites=true&w=majority';
// const db =
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
/* MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((client) => {
    // const db = client.db('my-db');
    // const collection = db.collection('my-collection');
  }).catch(error => console.error(error));

const uri = 'mongodb+srv://recipe-exercise:<password>@devjohnugbewi-rqyzn.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// app.use(express.json());
app.use(bodyParser.json());
app.use('/api', apiRouter);
//
apiRouter.route('/recipes')
  .get((req, res) => {
    DbSchema.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: `${error}`
        });
      }
    );
    /* const recipes = [
      {
        _id: 'oeihfzeoi',
        title: 'My food',
        ingredients: 'All of the ypu know',
        instructions: 'Be Careful',
        imageUrl: '',
        difficulty: 5,
        time: 90
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'My food',
        ingredients: 'All of the ypu know',
        instructions: 'Be Careful',
        imageUrl: '',
        difficulty: 3,
        time: 90
      }
    ];
    res.json(recipes); */
  })
  .post((req, res) => {
    // console.log(req.body);
    const recipe = new DbSchema({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      time: req.body.time,
      difficulty: req.body.difficulty
    });
    // res.status(201).json(recipe);
    recipe.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: `${error}`
        });
      }
    );
  });

apiRouter.route('/recipes/:id')
  .get((req, res) => {
    DbSchema.findOne({
      _id: req.params.id
    }).then(
      (recipe) => {
        res.status(200).json(recipe);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: `${error}`
        });
      }
    );
  })
  .put((req, res) => {
    const recipe = new DbSchema({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      time: req.body.time,
      difficulty: req.body.difficulty
    });
    DbSchema.updateOne({ _id: req.params.id }, recipe).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: `${error}`
        });
      }
    );
  })
  .delete((req, res) => {
    DbSchema.deleteOne({ _id: req.params.id }).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: `${error}`
        });
      }
    );
  });

/*
mongoose.connect('mongodb+srv://recipe-exercise:<gb3rjsP2CtMqhBvA>@devjohnugbewi-rqyzn.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    // console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
app.get('/api/recipes', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'My food',
      ingredients: 'All of the ypu know',
      instructions: 'Be Careful',
      imageUrl: '',
      difficulty: 5,
      time: 90
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'My food',
      ingredients: 'All of the ypu know',
      instructions: 'Be Careful',
      imageUrl: '',
      difficulty: 3,
      time: 90
    }
  ];
  res.status(200).json(stuff);
});

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Thing created successfully!'
  });
});
 app.post('/api/recipes', (req, res, next) => {
  const dbSchema = new DbSchema({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time
  });
  dbSchema.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error
      });
    }
  );
}); */
module.exports = app;
