const express = require ("express")
const app = express()
require('dotenv').config()
const cors = require('cors')

const connectDb = require('./Database/db')

//functionality
const userRoutes = require('./Controllers/User')

//Middleware
const errorHandler = require('./Middleware/error-handler')
const notFound = require('./Middleware/not-found')


app.use(express.json())
app.use(cors())
app.use('/@app/api/user', userRoutes)

app.use(errorHandler)
app.use(notFound)

const start = async()=>{
    const port = process.env.PORT
    try {
        connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on : ${port}`))
    } catch (error) {
        
    }
}

start()