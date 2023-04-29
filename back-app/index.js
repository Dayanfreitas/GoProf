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
app.use('/oauth', routes.oauth);
app.use('/users', routes.users);

// app.use(
//     '/files', 
//     express.static(
//         path.resolve(__dirname, 'tmp', 'uploads')
//     )
// )

app.get('/health', async (req, res)=>{
    res.json({'ok': 'Server is running'});
})

app.listen(PORT, HOST)