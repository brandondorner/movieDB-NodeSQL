const express = require('express');
const mysql = require('mysql')

const app = express()
//ablility to read incoming data from forms
app.use(express.urlencoded())


//setting up sql connection, then connecting
const db = mysql.createConnection({
    host:'localhost',
    user: 'testuser',
    password:'password123',
    database:'movies'
})

db.connect()

app.get('/movies', (req, res) => {
    //creating query
    const sql = 'SELECT * FROM movies LIMIT 500';

    db.query(sql, (err, results) => {
        if (err) throw err; 
        res.render('index', {results: results});
    });
} ); 

//handle form query
app.post('/submit', (req, res) => {
    console.log(req.body)
    const query = req.body.sortBy
    const sql = `SELECT * FROM movies ORDER BY ${query} ASC LIMIT 500`

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', {results: results})
    });
});

app.listen('3000', () => {
    console.log('server running on port 3000')
})

//set up express server
app.set('views', './public' )
//telling server to use ejs
app.set('view engine', 'ejs')
//telling server js files will be in public folder
app.use(express.static('public'))
//ablity to accept url parameters
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.render('index')
})
