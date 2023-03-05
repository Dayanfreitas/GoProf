require('dotenv').config();
const path = require('path');
const routes = require('./src/routes')
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT_SERVER
const HOST = process.env.HOST

const app = express();
app.use(express.json());
app.use(cors());

//ROUTES 
app.use('/users', routes.auth);
app.use('/categories', routes.categories);
app.use('/positions', routes.positions);
app.use('/products', routes.products);
app.use('/athletes', routes.athletes);

// exportar images
app.use(
    '/files', 
    express.static(
        path.resolve(__dirname, 'tmp', 'uploads')
    )
)

app.get('/', async (req, res)=>{
    res.json('Hello World');
})

app.listen(PORT, HOST)