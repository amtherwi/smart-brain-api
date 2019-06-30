const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signIn = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host:'127.0.0.1',
        user:'abdurrahman',
        password: '',
        database: 'smart-brain'
    }
})

// console.log(db.select('*').from('users'));
const app = express();

app.use(bodyParser.json());
app.use(cors());
const database = {
    users: [
        {
            id: '123',
            name: 'Abdurrahman',
            email: 'atherwi@gmail.com',
            password: '1234',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Hassan',
            email: 'hass@gmail.com',
            password: '12345',
            entries: 0,
            joined: new Date()
        },
    ]
}

app.get('/', (req, res) => { res.send((db.users))})

app.post('/signin', signIn.handelSignin( db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req,res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handelProfileGet(req, res, db)}) 
app.put('/image', (req, res) => { image.handelImage(req,res, db )})
app.post('/imageurl', (req, res) => { image.handleApiCall( req,res )})

app.listen(process.env.PORT || 3000 , () => {
    console.log('app is running on port', process.env.PORT)
})

/**
 * --> res = this is working 
 * /signin --> POST = success/fail
 * / register --> POST = user
 * /prfile/:userId --> GET = user
 * /image --> PUT --> user
 * 
 * 
 */