const express = require('express');
const mysql = require('mysql')
const PORT = process.env.PORT || 3000;
const server = require('http').Server(app)

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

app.get('/', (req, res) => {
    //creating query
    const sql = 'SELECT * FROM movies LIMIT 100';

    db.query(sql, (err, results) => {
        if (err) throw err; 
        res.render('index', {results: results});
    });
} ); 

//handle form query
app.post('/submit', (req, res) => {
    console.log(req.body)
    const sort = req.body.sortBy
    const limit = req.body.limit
    const year1 = req.body.year1
    const year2 = req.body.year2

    const sql = `SELECT * FROM movies
                WHERE movie_year
                BETWEEN ${year1} AND ${year2}
                ORDER BY ${sort} ASC 
                LIMIT ${limit}
    `

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', {results: results})
    });
});

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
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
