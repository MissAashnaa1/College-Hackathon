const express = require('express')
const session = require('express-session');

const app = express();
const port = 5000;

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine','ejs');
app.use(express.json()); 
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'))

const loginRoute = require('./routes/login')
const signupRoute=require('./routes/signup')
const compilerRoute=require('./routes/compiler')
const executeCodeRoute=require('./routes/executeCode')

app.route('/').get((req,res)=>{
    // console.log(req.session)
    // console.log(__dirname)
    if(!req.session.login) res.render('login', {loggedOut: 0, msg:"",phrase: ""});
    else res.render("discussion",{username: req.session.name})
})

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/compiler", compilerRoute);
app.use("/executeCode", executeCodeRoute);

const verifyMail = require('./methods/verifyMail');
app.get('/verifyMail/:token',verifyMail);

app.get('/logout',(req,res)=>{
    if(req.session.login){
        console.log("/logout")
        req.session.destroy();
        res.render('login',{loggedOut: 0, msg:"",phrase: "Logged Out"})
    }
    else{
        res.render('login',{loggedOut: false, phrase:"Login to krlo phle :)"})
    }
})

app.get('*',(req,res)=>{
    res.render('404');
});

app.listen(port,(error)=>{
    // if(!error) console.log("main--> Server running at port,", port);
    if(!error) console.log(`App listening at http://localhost:${port}`)
    else console.log("Error! ", error);
})