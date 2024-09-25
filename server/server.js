const express = require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const cookieParser=require('cookie-parser')
const fileUpload = require('express-fileupload');
const cors=require('cors')

const app=express()


app.use(express.json());

app.use(cookieParser());


const corsOptions = {
    origin: 'http://localhost:5173', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};


app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("SERVER IS RUNNING")
})


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.get('/',(req,res)=>{
    res.json({hello:"value"})
    res.end()
})

//Routes

app.use('/user',require('./routes/useRouter'))
app.use('/user',require('./routes/upload'))
app.use('/api',require('./routes/categoryRoutes'))
app.use('/api',require('./routes/productRouter'))


// Connecting to MongoDB

const URI =process.env.MONGODB_URL;

mongoose.connect(URI,{  
}).then(()=>{console.log("MongoDB Connected")    
}).catch(err=>{console.log(err)})

