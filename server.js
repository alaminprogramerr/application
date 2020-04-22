const express= require('express')
const PORT  = process.env.PORT||5000
const applicationRouter= require('./router/applicationRouter')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(applicationRouter)
mongoose.connect('mongodb://localhost/application_DB',{useNewUrlParser:true, useFindAndModify:false, useUnifiedTopology:true})
.then(()=>{
	console.log("mongodb connected successfull ")
})
.catch(err=>{
	console.log(err)
})
app.listen(PORT, ()=>{
    console.log('Server started on port on : ', PORT)
})
