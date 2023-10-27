const express = require('express')
const app = express();
const task = require('./routes/task')
const connectDB = require('./dB/connect')
const notFound = require('./middleware/not-found')

require('dotenv').config()

// middleware

app.use(express.static('./public'))
app.use(express.json())


// routes are setupped seperately

app.use('/api/v1/tasks',task)

app.use(notFound)

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(5000,()=>{
            console.log("server is listening on port 3000")
        })
    } catch (error) {
        console.log(error);
    }
}

start()


