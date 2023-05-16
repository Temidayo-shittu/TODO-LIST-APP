require('dotenv').config()
require('express-async-errors')
//express
const express= require('express')
const app= express()
//Rest of packages
const morgan= require('morgan')
const cookieParser= require('cookie-parser')
const rateLimiter= require('express-rate-limit')
const helmet= require('helmet')
const xss= require('xss-clean')
const cors= require('cors')
const mongoSanitize= require('express-mongo-sanitize')

//Database
const connectDB=  require('./db/connect')
//Routes
const authRouter= require('./routes/authRoutes')
const userRouter= require('./routes/userRoutes')
const taskRouter= require('./routes/taskRoutes')
//Middleware
const notFoundMiddleware= require('./middleware/not-found')
const errorHandlerMiddleware= require('./middleware/error-handler')

app.use(morgan('tiny'))

app.set('trust proxy',1)
app.use(rateLimiter({
    windowsMs: 15 * 60 * 1000,
    max:60
}))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', (req,res)=>{
    res.send('TODOLIST APP')
})
app.use('/auth',authRouter)
app.use('/users',userRouter)
app.use('/tasks',taskRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port= process.env.PORT || 3000

const start= async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()