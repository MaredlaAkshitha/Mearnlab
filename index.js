// const math=require("./second")
// console.log(math.add(2,5))
// console.log(math.sub(6,2))
// const fs=require("fs")
// console.log("before function")
// const hi=fs.writeFile("first1.txt","Hello goodmoring",(err,data)=>{
//     console.log(err,data)
//     console.log("ok we will continue with next ")
//  })
//  console.log(log1)
//  console.log("after function")

// const http=require('http')
// const fs=require('fs')
// const url=require('url')
// const path=require('path')
// const myServer=http.createServer((req,res)=>{
//     const log=`${new Date()}:${req.method}:requested\n`
//     fs.appendFile('log.txt',log,()=>{})
//     console.log("requested")
//     switch(req.url)
//     {
//         case'/':
//             if(req.method=='GET')
//             {
//             fs.readFile(path.join(__dirname,'index.html'),(err,content)=>{res.end(content)})
//             }
//             else if(req.method==='POST')
//             {
//                 // DB query
//                 res.end('post method execution')
//             } 
//             else if(req.method==='PUT')
//             {
//                 // DB query
//             }       
//             break;
//         case'/about':
//             res.end('hi hello')
//             break;
//         case'/services':
//             res.end('please select ur services')    
//         default:
//             res.end('404 page not found error')
            
//     }
// })
// myServer.listen(8001,()=>{console.log("Server Created")}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./schema');
const path = require('./path');
const session = require('express-session');
const passport = require('passport');
const { initializePassport } = require('./passportconfig')

mongoose.connect('mongodb://127.0.0.1:27017/pu')
.then(()=>{console.log('MongoDB connected')})
.catch((err)=>console.log('MongoDB connection Error',err));

passport.use(session({
    secret : 'your_secret_key',
    resave : false,
    saveUninitialized : false
}))
initializePassport(passport)
app.use(passport.initialize())
app.use(session())

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// app.use((req,res,next)=>{
//     console.log('use trying to access middle1')
//     next()
// })
// app.use((req,res,next)=>{
//     console.log('use trying to access middle2')
//     // res.send('welcome')
//     next()
// })
app.get('/',(req,res)=>{
    return res.sendFile(__dirname+'/public/index.html')
})
app.get('/about',(req,res)=>{
    res.send("This is about me")
    return res.sendFile(__dirname+'/public/index.html')
})
app.get('/services',(req,res)=>{
    console.log('requested')
    res.send("please select ur sercices")
})
app.post('/input',(req,res)=>{
    const Newuser = new user({
        FirstName : req.boby.FirstName, 
        LastName  : req.boby.LastName,
        Email     : req.boby.Email,
        UserName : req.boby.UserName,
        password : req.boby.password,
    });
    Newuser.save()
        .them(()=>{res.send('user saved succesfully')})
        .catch(err=>res.status(500).send('ERROR SAVING YOUR DATA:'+err))
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/login.html')
});
app.post('/login',
    passport.authenticate('loacal',{faileddirect1:'/login'}),(req,res)=>{
    res.send('Welcome ${req.user.UserName}');
});
app.listen(8000,()=>{
    console.log('http://localhost:8000');
});


